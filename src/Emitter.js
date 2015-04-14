define([], function () {

  /**
   * An emitter class for even emitting.  This is modeled after the node.js EventEmitter.
   * Can be overloaded or used directly.
   */
	function Emitter() {
		this.listeners = {};
		this.singleListener = {};
	}

	// ### emit()
	// Method for emitting events. The first argument should be an event type.
	// Subsequent argument should be the data emitting. Any number of data items
	// can be emitted.
	// On emitting, it will call each `listener` and `once listener`. It will
	// remove the `once listeners` called.
	Emitter.prototype.emit = function() {
		var args = Array.prototype.slice.call(arguments);
		var event = args.shift();
		// initialize the local iterators
		var localMulti = [];
		var localSingle = [];
		var i;
		// Copy the class variables to isolate it from any additions or
		// subtractions. Copying to retaining the references to the functions.
		if (this.listeners[event]) {
			localMulti = this.listeners[event].slice(0);
		}
		if (this.singleListener[event]) {
			localSingle = this.singleListener[event].slice(0);

		}

		// iterate through the local variables
		for ( i = 0; i < localMulti.length; i++) {
			try {
				localMulti[i].apply(null, args);
			} catch (ex) {
				console.error("EXCEPTION with Emitter.emit() on a `listener` callback : " + ex.toString());
			}

		}
		for (i = 0; i < localSingle.length; i++) {
			try {
				localSingle[i].apply(null, args);
			} catch (ex) {
				console.error("EXCEPTION with Emitter.emit() on a `once` callback : " + ex.toString());
			}

			// delete the oncees it from the original
			var k = this.singleListener[event].indexOf(localSingle[i]);
			this.singleListener[event].splice(k, 1);
		}
	};

	// ### addListener()
	// Add a listener to the emitter. The first arguemnt is the event type and
	// the second is the callback.
	Emitter.prototype.addListener = function(event, callback) {
		if (this.listeners[event] == null) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(callback);
	};

	// ### on()
	// Identical to `addListener`.
	Emitter.prototype.on = function(event, callback) {
		this.addListener(event, callback);
	};

	// ### once()
	// Addes a listener that will be removed after calling. It only get called
	// once.
	Emitter.prototype.once = function(event, callback) {
		if (this.singleListener[event] == null) {
			this.singleListener[event] = [];
		}
		this.singleListener[event].push(callback);
	};

	// ### removeListener()
	// Removes a `listener` or a `once listener`.
	Emitter.prototype.removeListener = function(event, callback) {
		var i;
		// remove the repeated listeners
		if (this.listeners[event]) {
			i = this.listeners[event].indexOf(callback);
			if (i >= 0) {
				this.listeners[event].splice(i, 1);
			}
		}
		// remove the single listeners
		if (this.singleListener[event]) {
			i = this.singleListener[event].indexOf(callback);
			if (i >= 0) {
				this.singleListener[event].splice(i, 1);
			}
		}
	};

	Emitter.prototype.removeAllListeners = function(args) {
		var event;
		if (arguments.length > 0) {
			for ( var i = 0; i < arguments.length; i++) {
				delete this.listeners[arguments[i]];
				delete this.singleListener[arguments[i]];
			}
		} else {
			for ( event in this.listeners) {
				delete this.listeners[event];
			}

			for ( event in this.singleListener) {
				delete this.singleListener[event];
			}

		}
	};

  return Emitter;
});