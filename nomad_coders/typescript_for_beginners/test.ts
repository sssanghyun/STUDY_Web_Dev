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

function superPrint<T>(a: T[]){
	return a[0]
}
const aa = superPrint([1, 2, 3, 4]) //OK

type A = Array<number>

let aaa:A = [1, 2, 3, 4] //OK

// 클래스
class Player1{
	constructor(
		private firestName: string,
		private lastName: string,
		public nickname: string
	) {}
}

const bbb = new Player1("nico", "las", "good")
//bbb.firstName // private
bbb.nickname // OK

// 추상 클래스
abstract class User {
    constructor(
            private firestName: string,
            private lastName: string,
            protected nickname: string
        ) {}
        // 추상 메소드
        abstract getNickName():void
        getFullName(){
            return `${this.firestName} ${this.lastName}`
        }
    }
    
class Player2 extends User {
    // 추상메소드 구현
    getNickName(){
        console.log(this.nickname)
    }
}
const ccc = new Player2("nico", "las", "good")

ccc.getFullName()


type Words = {
    [key:string]: string
}

// let dict :Words = {
//     "potato": "food"
// }

class Dict {
	private words: Words
	constructor(){
		this.words = {}
	}
	add(word:Word){
		if(this.words[word.term] === undefined){
			this.words[word.temr] = word.def;
        }
	}
	def(term:string){
		return this.words[term]
    }
}

class Word {
	constructor(
		public term: string,
		public def: string
	) {}
} 

const kimchi = new Word("kimchi", "한국의 음식")

const dict = new Dict()
dict.add(kimchi)
dict.def("kimchi")

// 타입이 특정한 값을 갖도록 할 수 있음
type Team3 = "red" | "blue" | "green"
type Player3 = {
	nickname:string,
	team: Team
}

const test :Player3 = {
	nickname: "asd",
	team: "blue" // O
	// team : "yellow" X
}

type Team4 = "red" | "blue" | "green"
type Player4 = {
	nickname:string,
	team: Team4
}

// interface
interface Player5 {
	nickname: string,
	team: Team4
}

interface User {
	name: string
}

// User 상속
interface Superuser extends User{
}

type User1 = {
	name: string
}
// 상속
// type Player = User & {
// }

interface User2 {
	name: string
}
interface User2 {
	health: number
}

const user2: User2 ={
	name:"asd",
	health: 10
}
//가능 같은 인터페이스를 합쳐줌(타입으로 구현하면 중복 안됨)


// js는 abstract 가 없음.
abstract class User6 {
	constructor(
		protected firstName: string,
		protected lastName: string
	) {}
	abstract sayHi(name:string):string
	abstract fullName():string
}
class Player6 extends User6 {
	fullName(){
		return `${this.firstName} ${this.lastName}`
	}
	sayHi(name:string){
		return `Hello ${name}. My name is ${this.fullName()}`
	}
}

interface User7 {
		firstName: string,
		lastName: string,
		sayHi(name:string):string
		fullName():string
}
class Player7 implements User7 {
	constructor(
		// private, protected가 될 수 없음
		public firstName:string,
		public lastName:string
	) {}
	fullName(){
		return `${this.firstName} ${this.lastName}`
	}
	sayHi(name:string){
		return `Hello ${name}. My name is ${this.fullName()}`
	}
}

type Player10 = {
	name:string
}
// type 상속
type Player10A = Player10 & {
	lastname:string
}
const player10: Player10A = {
	name:"nico",
	lastname:"park"
}

interface Player11 {
	name: string
}
// 인터페이스 상속
interface Player11A extends Player11 {
	lastName: "park"
}
// 인터페이스는 중복 가능
interface Player11A {
	health:number
}

const player11: Player11A ={
	name: "nico",
	lastName: "park",
	health:5
}

// 추상클래스
type PlayerC = {
	firstName:string
}
interface PlayerD {
	firstName:string
}
// 타입 상속
class UserE implements PlayerC {
	constructor(
		public firstName:string
	){}
}
// 인터페이스 상속
// class UserE implements PlayerD {
//	constructor(
//		public firstName:string
//	){}
//}
// - 클래스나 오브젝트 모양을 정의하고 싶다면 인터페이스 사용
// - 다른 모든 경우 타입을 씀