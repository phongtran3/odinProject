const merge = (left, right) => {
	let array = [];
	let l = 0;
	let r = 0;

	while (l < left.length && r < right.length) {
		if (left[l] < right[r]) {
			array.push(left[l]);
			l++;
		} else {
			array.push(right[r]);
			r++;
		}
	}
	array.push(...left.slice(l), ...right.slice(r));

	return array;
};

export const mergeSort = (arr) => {
	if (arr.length <= 1) return arr;

	let mid = Math.floor(arr.length / 2);
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));

	return merge(left, right);
};

mergeSort([3, 2, 1, 13, 8, 5, 0, 1]);
