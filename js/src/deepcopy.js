

/**
 * Deep copy method for any object.
 * /!\ Use with caution.
 */

var deepcopy = function(object){
	var copy = (object instanceof Array) ? [] : {};
	for (i in object) {
		if (object[i] && typeof object[i] === "object") {
			copy[i] = deepcopy(object[i]);
		}
		else {
			copy[i] = object[i];
		}
	}
	return copy;
};

exports.deepcopy = deepcopy;
