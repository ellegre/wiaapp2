export default {

	getUnitMovingState(elem, session) {

		const wialon = window.wialon;
		let info = {
			isMoving: false, // by real-time sensor or speed
			isIgnitionOn: null, // Boolean | null

			isLbs: false,
			isStale: true, // expired `unitMovingTimeout`

			isPositionPresent: false,
			isIgnitionPresent: false,
			isRealTimeSensorPresent: false
		};
		let pos = elem.getPosition();
		if (!pos) {
			return "--";
		}
		info.isPositionPresent = true;

		// LBS
		info.isLbs = !!(
		pos.s <= 0 &&	
		typeof pos.f === "number" &&
		wialon.util.Number.and(pos.f, wialon.item.Unit.dataMessageFlag.lbsFlag)
		);
		let serverTime = session.getServerTime();
		let currentUser = session.getCurrUser();

		// Stale position
		let unitMovingTimeout = parseInt(
			currentUser.getCustomProperty("mu_move_durr", "3600"),
			10
		);
		if (!isFinite(unitMovingTimeout)) unitMovingTimeout = 3600;
		info.isStale = unitMovingTimeout < serverTime - pos.t;

		// Sensors
		let sensors = elem.getSensors();
		let realTimeSensor, ignitionSensor;
		for (let prop in sensors)
			if (sensors[prop].t === "real-time motion sensor") {
				realTimeSensor = sensors[prop];
				break;
			}
		for (let prop in sensors)
			if (sensors[prop].t === "engine operation") {
				ignitionSensor = sensors[prop];
				break;
			}

		// Ignition
		let ignitionSensorValue = null;
		if (ignitionSensor) {
			ignitionSensorValue = elem.calculateSensorValue(ignitionSensor,elem.getLastMessage());
			if (typeof ignitionSensorValue === "number") {
				info.isIgnitionPresent = true;
			}
		}
		info.isIgnitionOn = !!ignitionSensorValue;

		// Moving state
		let realTimeSensorValue = null;
		if (realTimeSensor) {
			realTimeSensorValue = elem.calculateSensorValue(realTimeSensor, elem.getLastMessage());
			if (typeof realTimeSensorValue === "number") {
				info.isRealTimeSensorPresent = true;
			}
		}
		if (typeof realTimeSensorValue === "number") {
			info.isMoving = realTimeSensorValue !== 0;
		} else {
			info.isMoving = pos.s > 0;
		}
		let movingState;
		if (info.isMoving) {
			movingState = "YES";
		}
		else {
			movingState = "NO";
		}
		return movingState;
	},

	getPlateNumber(profileData) {
		let plateNumbers = Object.values(profileData).find(value => value.n === "registration_plate");
		let plateNumber = "--";
		if (plateNumbers) {
			plateNumber = Object.values(plateNumbers)[2];
		}
		return plateNumber;
	},
	
	getFuelLevel(elem) {
		const fuelLevelSensor = Object.values(elem.getSensors()).find(value => value.t === "fuel level");
		let fuelLevel = "N/S";
		if (fuelLevelSensor) {
			fuelLevel = (elem.calculateSensorValue(fuelLevelSensor, elem.getLastMessage()));
			if (fuelLevel === -348201.3876) {
				fuelLevel = "N/A";
			}
			if (fuelLevel !== "N/A" && fuelLevel !== "N/S" ) {
				fuelLevel = Math.round(fuelLevel);
			}
		}
		return fuelLevel;
	},

	getTemperatureLevel(elem) {
		const temperatureSensor = Object.values(elem.getSensors()).find(value => value.t === "temperature");
		let temperatureLevel = "N/S";
		if (temperatureSensor) {
			temperatureLevel = (elem.calculateSensorValue(temperatureSensor, elem.getLastMessage()));
			if (temperatureLevel === -348201.3876) {
				temperatureLevel = "N/A";
			}
			if (temperatureLevel !== "N/A" && temperatureLevel !== "N/S" ) {
				temperatureLevel = Math.round(temperatureLevel);
			}
		}
		return temperatureLevel;
	},

	getMileageLevel(elem, message) {
		const mileageSensor = Object.values(elem.getSensors()).find(value => value.t === "mileage");
		let mileageLevel = "N/S";
			if (mileageSensor) {
				mileageLevel = (elem.calculateSensorValue(mileageSensor, message || elem.getLastMessage()));
				if (mileageLevel === -348201.3876) {
					mileageLevel = "N/A";
				}
				if (typeof mileageLevel == "number") {
					mileageLevel = Math.round(mileageLevel);
				}
			}
		return mileageLevel;
	},

	getEngineLevel(elem) {
		const engineSensor = Object.values(elem.getSensors()).find(value => value.t === "engine operation");
		let engineLevel = "N/S";
		if (engineSensor) {
			engineLevel = (elem.calculateSensorValue(engineSensor, elem.getLastMessage()));
			if (engineLevel === -348201.3876) {
				engineLevel = "N/A";
			}
			if (engineLevel === 0) {
				engineLevel = "off";
			}
			if (engineLevel === 1) {
				engineLevel = "on";
			}
		}
		return engineLevel;
	}
}
