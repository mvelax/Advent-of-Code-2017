/* the perimeter of each square is:

This square starts, next square starts.

start at i = 0, starts at 1, ends at 2.
i = 1, starts at 2, ends at 2 + ((i*2)+1)*4-4
i = 2 starts at 10, ends at 10 + () = 26

if num < ends at and >= starts at return i
*/

input = 289326;
console.log(spiralDistance2(input));

function spiralDistance(input){
	let i = 0;
	let start_index = 1;
	let end_index = 2;
	while (true){
		if(input < end_index && input >= start_index){
			// Find displacement from center
			let j = start_index;
			let rel = j - start_index;
			let displacement = Math.abs((rel+1)%(i*2+1) - i+1);
			while (j != input){
				j++;
				rel = j - start_index;
				displacement = Math.abs((rel+1)%(i*2+1) - i+1);
			}
			/*
			console.log(i)
			console.log(j)
			console.log(rel)
			console.log(displacement)
			console.log(start_index)
			console.log(end_index)*/
			return i + displacement;
		}
		i++;
		start_index = end_index;
		end_index = start_index + ((i*2)+1)*4-4;
	}
}

function spiralDistance2(input){
	let i = 0;
	let j = 0;
	let horizontal = 1;
	let vertical = 1;
	let right = true;
	let up = true;
	let grid = {};
	grid['i'+i+'j'+j] = 1;
	while (grid['i'+i+'j'+j]<=input){
		if (right){
			let steps = 0;
			while ( grid['i'+i+'j'+j]<=input && steps < horizontal){
				i++;
				steps++;
				grid['i'+i+'j'+j]= definedSum(grid, i, j);
			}
			horizontal++;
			right = !right;
		}
		if (up){
			let steps = 0;
			while ( grid['i'+i+'j'+j]<=input && steps < vertical){
				j++;
				steps++;
				grid['i'+i+'j'+j]= definedSum(grid, i, j);
			}
			vertical++;
			up = !up;
			
		}
		if (!right){
			let steps = 0;
			while ( grid['i'+i+'j'+j]<=input && steps < horizontal){
				i--;
				steps++;
				grid['i'+i+'j'+j]= definedSum(grid, i, j);
			}
			horizontal++;
			right = !right;
		} 
		if (!up) {
			let steps = 0;
			while ( grid['i'+i+'j'+j]<=input && steps < vertical){
				j--;
				steps++;
				grid['i'+i+'j'+j]= definedSum(grid, i, j);
			}
			vertical++;
			up = !up;
		}
		
	}
	return grid['i'+i+'j'+j];
}

function definedSum(dictionary, i, j){
	let sum = 0;
	for (let up = -1; up <= 1; up++){
		for (let right = -1; right <= 1; right++){
			if (dictionary['i'+(i+right)+'j'+(j+up)]){
				sum += dictionary['i'+(i+right)+'j'+(j+up)];
			}
		}
	}
	return sum;
}