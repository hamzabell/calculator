function addChar(character) {
	var input = document.getElementById("screen");
	if(input== null || input== "0")
		input.value = character
	else
		input.value += character
}

function clearInput(){
	var input = document.getElementById("screen");
	input.value = "";
}


function isEqual(){
	var Input=document.getElementById("screen").value;
	var Operators =['+','-','*','/','%'];
	var Pre=[1,1,2,2,2];
	var Infix=new Array();
	var Postfix=new Array();
	var answer;
	Infix= makeArray(Input);
	Postfix= InToPost(Infix,Operators,Pre);
	answer=solvePost(Postfix);
	clearInput();
	addChar(answer);


}


function makeArray(str){
	var n= new Array(0);
	var sa='';
	var i=0;
	while(i<str.length){
		if(isOperand(str[i])){
			sa =str[i];
			var j=1;
			while(isOperand(str[i+j])){
				sa+=str[i+j];
				j=j+1;
			}
			n.push(sa);
			i=i+j;
		}
		else if(isOPerat(str[i])){
			//alert("check");
			n.push(str[i]);
			i=i+1;
		}
		else{
			//alert("else");
			i=i+1;
		}
	}
	return n;

}
function isOPerat(op){
	switch(op){
		case '+':
		case '-':
		case '/':
		case '*':
		case '%': return true;
		default : return false;
	}

}

function InToPost(statement,op,prece){//prece[] ??????????????
	var PostE=new Array(0);
	var Trash='';//stores the precedence of popped element
	var stack= new Array(1);
	stack[0]='#';
	var stackPre=new Array(1);
	stackPre[0]=0;
	statement.push('#');
	var i;
	for(i=0;i<statement.length;i++){
		var j;
		j=isOperator(statement[i],op);
		if(Number.isInteger(Number(statement[i]))==true){
			PostE.push(statement[i]);
		}
			else if(Number.isInteger(j)==true){//statement[i]==op[j]){
				if(prece[j]<stackPre[stack.length-1]){//if current pre is less than the pre at the top of stack
					while(prece[j]<stackPre[stackPre.length-1]){
						PostE.push(stack.pop());
						Trash+=stackPre.pop();//pop the precedence
					}	
						stack.push(statement[i]);
						stackPre.push(prece[j]);
					
				}

				else if(prece[j]>=stackPre[stackPre.length-1]){
					stack.push(statement[i]);
					stackPre.push(prece[j]);
				}
			}
		if(statement[i]=='#'){
			var ia;
			ia=stack.length-1;
			while(ia>=1){
				PostE.push(stack[ia]);
				ia=ia-1;
			}
		}
	}
	//alert(PostE);
	//solvePost(PostE);
	return PostE;
}

function isOperator(key,ops){
	for(var i=0; i<ops.length;i++){
		if(key==ops[i]){
			return i;
		}
		
	}
	return "no";
}

function solvePost(exp){

	var stack = new Array();
	var ia ;
	var ans;
    ia=0;
	while(ia < exp.length){
		if(Number.isInteger(Number(exp[ia]))){
			//alert(i);
			stack.push(exp[ia]);
	    }
	    else{
			if(stack.length<2){
				alert("Error");//change here
				break;
			}
			var b=Number(stack.pop());
			var a=Number(stack.pop());
			var c=operate(a,exp[ia],b);
			stack.push(c);
		}
		ia++;	

	}
	ans=stack.pop();
	//alert(ans);
	return ans;

}

function isOperand(index){
	return (index>='0' && index<='9');
}
function operate(x,op,y){
	if(op=='+'){
		return x+y;
	}
	else if(op=='-'){
		return x-y;
	}
	else if(op=='*'){
		return x*y;
	}
	else if(op=='/'){
		return x/y;
	}
	else if(op=='%'){
		return x%y;
	}
	return alert("cant operate");
}

function cos() {
	var input = document.getElementById("screen");
	input.value = Math.cos(input.value);
}

function sin() {
	var input = document.getElementById("screen");
	input.value = Math.sin(input.value);
}

function tan() {
	var input = document.getElementById("screen");
	input.value = Math.tan(input.value);
}

function sqrt() {
	var input = document.getElementById("screen");
	input.value = Math.sqrt(input.value);
}

function ln() {
	var input = document.getElementById("screen");
	input.value = Math.log(input.value);
}

function exp() {
	var input = document.getElementById("screen");
	input.value = Math.exp(input.value);
}
