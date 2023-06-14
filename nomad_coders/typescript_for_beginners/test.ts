// const nico = {
//     nickname: "nick"
// }

// hello()라는 함수가 없기때문에 에러
// nico.hello()

let a = "hello"
// a 는 string이라고 추정
a = "bye"
// 가능

// a = 1
// Ts에서는 불가능

let b : boolean = true // 가능
// let b : boolean = "x" // 불가

// let c = [1, 2, 3]
// c.push("1") // 불가

let c : number[] = []
c.push(1) // 가능

// name은 모두 가지고 age는 있을수도있다.
// const Player : {
// 	name: string,
// 	age?: number
// } = {
//     name:"ssang"
// }

// type을 선언할때 첫문자는 대문자
// ?는 선택적 타입
// type Player = {
// 	name: string,
// 	age?: number
// }
// const playerSang : Player = {
// 	name:"nico"
// }
// const playerHyun : Player = {
// 	name:"hyun"
// }

// type Age = number;

// function playerMaker(name:string) : Player {
// 	return {
// 		name	
// 	}
// }

// const playerMaker = (name:string) : Player => ({name})

type Player = {
	readonly name: string,
	// name은 읽기전용
	age?: number
}

const playerMaker = (name:string) : Player => ({name})
const nico = playerMaker("nico")
nico.age = 12 // OK
// nico.name = "asd" // 읽기전용이라 안됨

// let a = [] // a는 any타입 아무타입이나 될 수 있음.
// const b : any = []
// any를 사용하면 타입스크립트의 보호를 받지 못함(비활성화)

// 타입을 모를 때
// let a:unknown;
// type을 체크하고 사용해야함

// let b = a + 1 // 안됨 a의 타입이 정해지지 않음.

if(typeof a === 'number'){
	let b = a + 1
	// 가능 a의 타입이 number로 확정됨
}

// function hello():void{
// function hello(){
// 	console.log("x")
// }
// return이 없어서 void

function hello(name:string|number){
	if(typeof name === "string"){
		//name은 string
	}else if(typeof name === 'number'){
		//name은 number
	}else {
		//name은 never
	}
}

type Add = (a:number, b:number) => number;

const add:Add = (a, b) => a + b

type SuperPrint = {
	<TypePlaceholder>(arr: TypePlaceholder[]):TypePlaceholder
}

// const superPrint: SuperPrint = (arr) => {
// 	arr.forEach(i => console.log(i))
// }

// const a = superPrint([1, 2, 3, 4]) //OK
// const b = superPrint([true, ture, false]) //OK
// const c = superPrint([1, 2, true]) // OK
// const d = superPrint([1, 2, true]) // OK