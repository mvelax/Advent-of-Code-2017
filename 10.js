let input = `183,0,31,146,254,240,223,150,2,206,161,1,255,232,199,88`

let list = [...Array(256).keys()];

let instructions = [];
for (let i = 0; i < input.length; i++){
	//console.log(input.charAt(i), input.charCodeAt(i));
	instructions.push(input.charCodeAt(i));
}
let suffix = [17, 31, 73, 47, 23];
instructions = instructions.concat(suffix);
//console.log(instructions);
let sparse_hash = followInstructions(instructions, list, 64);
let dense_hash = [];
for (i = 0; i < 256; i += 16){
	let sub_array = sparse_hash.slice(i, i+16);
	dense_hash.push(sub_array.reduce((acum, next) => acum ^ next).toString(16).padStart(2,0));
}
console.log(dense_hash.join(""));
console.log(dense_hash.join("").length)

function followInstructions(instrictions, list, repeat=1){
	let current_position = 0;
	let skip_size = 0;
	for (let i = 0; i < repeat; i++){
		for (let length of instructions){
			list = reverseList(list, current_position, length);
			current_position = (current_position + length + skip_size) % list.length;
			skip_size++;
		}
	}
	return list;
}

function reverseList(list, current_position, length){
	if (length < 2 || length > list.length){
		console.log("ERROR", list, length)
		return list;
	}
	let reversed_list = list.slice();
	for (let i = 0; i < length; i++){
		let copy_to_index = (current_position+i) % list.length;
		let copy_from_index = (current_position+length-1-i) % list.length;
		reversed_list[copy_to_index] = list[copy_from_index];
	}
	return reversed_list;
	
}