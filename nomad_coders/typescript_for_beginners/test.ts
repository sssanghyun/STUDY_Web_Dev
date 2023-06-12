const nico = {
    nickname: "nick"
}

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
type Player = {
	name: string,
	age?: number
}
const playerSang : Player = {
	name:"nico"
}
const playerHyun : Player = {
	name:"hyun"
}

type Age = number;

// function playerMaker(name:string) : Player {
// 	return {
// 		name	
// 	}
// }

const playerMaker = (name:string) : Player => ({name})