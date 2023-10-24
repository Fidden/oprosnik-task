import useBem from 'vue3-bem';


export const cnIndexScreen = useBem('index-screen');

export enum GroupBy {
	DAY = 'DAY',
	WEEK = 'WEEK',
	MONTH = 'MONTH'
}

export enum IndexScreenTab {
	USERS = 'USERS',
	DEVICES = 'DEVICES',
	NEWCOMER = 'NEWCOMER'
}
