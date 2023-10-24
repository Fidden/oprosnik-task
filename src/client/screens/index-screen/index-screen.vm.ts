import type {GetMetricsQuery} from '#gql';
import {Device} from '#gql/default';
import {DateTime} from 'luxon';
import type {ISetupable} from 'nuxt-mvvm/dist/runtime/types';
import {GroupBy, IndexScreenTab} from '~/client/screens/index-screen/index-screen.const';
import {toInputDateFormat} from '~/client/shared/helpers/to-input-date';

@ScreenVm()
export class IndexScreenVm extends BaseViewModel implements ISetupable {
	public response?: GetMetricsQuery;
	public dateStart: string;
	public dateEnd: string;
	public groupBy: GroupBy;
	public currentTab: IndexScreenTab;
	public prevMonthResponse?: GetMetricsQuery;

	constructor() {
		super();
		const dateStart = new Date();
		dateStart.setDate(dateStart.getDate() - 7);
		this.response = undefined;
		this.prevMonthResponse = undefined;
		this.dateStart = toInputDateFormat(dateStart);
		this.dateEnd = toInputDateFormat(new Date());
		this.groupBy = GroupBy.DAY;
		this.currentTab = IndexScreenTab.USERS;
	}

	public onSetup() {
		watch([() => this.dateStart, () => this.dateEnd], () => {
			this.fetch();
		});
	}

	public async fetch() {
		const [current, prev] = await Promise.all([
			useAsyncGql('getMetrics', {
				dateEnd: this.dateEnd,
				dateStart: this.dateStart
			}),
			useAsyncGql('getMetrics', {
				...this.prevDate
			})
		]);

		this.response = current.data.value;
		this.prevMonthResponse = prev.data.value;
	}

	public setTab(tab: IndexScreenTab) {
		this.currentTab = tab;
	}

	/**
	 * Calculates the number of days between two given dates.
	 *
	 * @private
	 * @returns {number} The number of days between the two dates.
	 */
	private get dateOffset() {
		const getDaysBetweenDates = (date1: string, date2: string) => {
			let oneDay = 24 * 60 * 60 * 1000; // hours *minutes *seconds *milliseconds
			return Math.round(Math.abs((new Date(date1).getTime() - new Date(date2).getTime()) / oneDay));
		};

		return getDaysBetweenDates(this.dateEnd, this.dateStart);
	}

	/**
	 * Calculates the previous date based on the current date and offset.
	 *
	 * @private
	 * @returns {object} - An object containing the previous start and end dates.
	 */
	private get prevDate() {
		const prevDateStart = new Date(this.dateStart);
		prevDateStart.setDate(prevDateStart.getDate() - this.dateOffset);

		const prevDateEnd = new Date(this.dateEnd);
		prevDateEnd.setDate(prevDateEnd.getDate() - this.dateOffset);

		return {
			dateStart: prevDateStart,
			dateEnd: prevDateEnd
		};
	}

	/**
	 * Returns Graph data by selected tab
	 *
	 * @returns {Array} The graph data for the selected tab
	 * @throws {Error} If the selected tab is unrecognized
	 */
	public get data() {
		switch (this.currentTab) {
			case IndexScreenTab.USERS:
				return this.usersGraphData;
			case IndexScreenTab.DEVICES:
				return this.deviceGraphData;
			case IndexScreenTab.NEWCOMER:
				return this.newComerGraphData;
			default:
				throw new Error(`Unrecognized tab: ${this.currentTab}`);
		}
	}


	/**
	 * Graph users data for passing into graph component
	 * @private
	 */
	private get usersGraphData() {
		let labels = Object.keys(this.userCountDatasets);
		let datasets = [
			{
				label: 'Visitors',
				data: Object.values(this.userCountDatasets),
				backgroundColor: '#adfa1d',
				borderRadius: 6
			}
		];

		return {
			labels,
			datasets
		};
	}

	/**
	 * Graph device data for passing into graph component
	 * @private
	 */
	private get deviceGraphData() {
		return {
			labels: Object.keys({
				...this.deviceCountDatasets.PC,
				...this.deviceCountDatasets.TABLET,
				...this.deviceCountDatasets.MOBILE
			}),
			datasets: [
				{
					label: Device.PC,
					data: Object.values(this.deviceCountDatasets.PC),
					backgroundColor: '#adfa1d',
					borderRadius: 6
				},
				{
					label: Device.TABLET,
					data: Object.values(this.deviceCountDatasets.TABLET),
					backgroundColor: '#1dfaf3',
					borderRadius: 6
				},
				{
					label: Device.MOBILE,
					data: Object.values(this.deviceCountDatasets.MOBILE),
					backgroundColor: '#eb1dfa',
					borderRadius: 6
				}
			]
		};
	}

	/**
	 * Graph newcomer data for passing into graph component
	 * @private
	 */
	private get newComerGraphData() {
		return {
			labels: Object.keys(this.newComerDatasets),
			datasets: [
				{
					label: 'Newcomers',
					data: Object.values(this.newComerDatasets),
					backgroundColor: '#fad51d',
					borderRadius: 6
				}
			]
		};
	}

	/**
	 * Generates dataset for device
	 * @private
	 */
	private get deviceCountDatasets() {
		const output: Record<Device, Record<string, number>> = {
			[Device.MOBILE]: {},
			[Device.TABLET]: {},
			[Device.PC]: {}
		};

		for (const item of this.response!.metrics) {
			const visitDate = this.groupNameByDate(new Date(item.visitTime), this.groupBy);
			if (!output[item.device]) {
				output[item.device] = {};
			}

			if (!output[item.device][visitDate]) {
				output[item.device][visitDate] = 1;
				continue;
			}

			output[item.device][visitDate]++;
		}

		return output;
	}


	/**
	 * Generates dataset for user graph
	 * @private
	 */
	private get userCountDatasets() {
		const output: Record<string, number> = {};

		for (const item of this.response!.metrics) {
			const visitDate = this.groupNameByDate(new Date(item.visitTime), this.groupBy);
			if (!output[visitDate]) {
				output[visitDate] = 1;
				continue;
			}

			output[visitDate] = output[visitDate] + 1;
		}

		return output;
	}

	/**
	 * Generates dataset for newcomer graph
	 * @private
	 */
	private get newComerDatasets() {
		const output: Record<string, number> = {};

		for (const item of this.response!.metrics) {
			if (!item.isNew) {
				continue;
			}

			const visitDate = this.groupNameByDate(new Date(item.visitTime), this.groupBy);
			if (!output[visitDate]) {
				output[visitDate] = 1;
				continue;
			}

			output[visitDate] = output[visitDate] + 1;
		}

		return output;
	}

	public get totalUsersIncome() {
		return this.calculateTotalIncome(
			this.response!.metrics.length,
			this.prevMonthResponse!.metrics.length
		);
	}

	public get totalNewcomerIncome() {
		return this.calculateTotalIncome(
			this.response!.metrics.filter(item => item.isNew).length,
			this.prevMonthResponse!.metrics.filter(item => item.isNew).length
		);
	}

	/**
	 * Calculates the total income based on the current count and previous count.
	 * @param {number} countCurrent - The current count.
	 * @param {number} countPrev - The previous count.
	 * @param {string} [text='since '] - The optional additional text to be displayed.
	 * @return {Object} - The total income object, which includes the value, percent, and additional text.
	 *                   - The value represents the difference between the current count and previous count.
	 *                   - The percent represents the percentage difference between the current count and previous count.
	 *                   - The percentAdditional represents the additional text with the previous date.
	 */
	private calculateTotalIncome(countCurrent: number, countPrev: number, text = 'since ') {
		return {
			value: countCurrent - countPrev,
			percent: Math.floor((countCurrent - countPrev) / countPrev * 100),
			percentAdditional: `${text} ${this.prevDate.dateStart.toLocaleDateString('ru-RU')}`
		};
	}

	private groupNameByDate(date: Date, groupType: string): string {
		const dt = DateTime.fromJSDate(date);
		switch (groupType) {
			case GroupBy.DAY:
				return dt.toFormat('yyyy-LL-dd');
			case GroupBy.WEEK:
				return dt.toFormat('kkkk-WW');
			case GroupBy.MONTH:
				return dt.toFormat('yyyy-LL');
			default:
				throw new Error(`Unsupported groupType: ${groupType}`);
		}
	}
}
