import { settings } from "cluster";

// Anonymous interface definition
let settingStore: {
	[settingName: string]: any
} = {};

export function getSetting<T>(name: string, defaultValue?: T): T {
	if (settingStore[name] !== undefined) {
		return settingStore[name] as T;
	}
	else if (defaultValue === undefined) {
		throw new Error("Setting does not exist");
	}
	else {
		updateSetting<T>(name, defaultValue);
		return getSetting(name);
	}
}

export function updateSetting<T>(name: string, value: T): void {
	settingStore[name] = value;
}
