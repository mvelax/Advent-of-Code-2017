const input = `5	1	10	0	1	7	13	14	3	12	8	10	7	12	0	6`;
let input_num_arr = input.split('\t').map(Number);

console.log(distributeInfinitely(input_num_arr));

function distributeInfinitely(input_num_arr){
	let i = 0;
	let seen_states = new Map();
	seen_states.set(input_num_arr.join(","),  i);
	while(true){
		i++;
		input_num_arr = distribute(input_num_arr);
		key = input_num_arr.join(",");
		if(seen_states.has(key)){
			return i - seen_states.get(key);
		} else {
			seen_states.set(key, i);
		}
	}
}

function distribute(input_num_arr){
	const max_i = indexOfMax(input_num_arr);
	const max = input_num_arr[max_i];
	input_num_arr[max_i] = 0;
	const div = Math.floor(max / input_num_arr.length);
	const residue = max % input_num_arr.length;

	input_num_arr = input_num_arr.map(x => x+div);
	if (residue > 0){
		for (let i = 1; i<= residue; i++){
			input_num_arr[(i+max_i)%input_num_arr.length]++;
		}
	}
	return input_num_arr;
}

function indexOfMax(arr){
	return arr.reduce((acum, currentVal, currentIndex) => {
		if (acum[1]< currentVal){
			acum = [currentIndex, currentVal];
		}
		return acum;
			}, [-1, -1])[0];
}