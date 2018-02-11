// Anonymous interface definition
let settingStore: {
	[settingName: string]: any
} = {};

export function getSetting<T>(name: string, value?: T): T {
	if (settingStore[name]) {
		return settingStore[name] as T;
	}
	else if (value === undefined) {
		throw new Error("Setting not found!");
	}
	else {
		updateSetting(name, value);
		return value;
	}
}

export function updateSetting<T>(name: string, value: T): void {
	settingStore[name] = value;
}
