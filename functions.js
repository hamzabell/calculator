

function MyEval(){
	var Input=document.getElementById("inp").value;
	var Operators =['+','-','*','/','%'];
	var Pre=[1,1,2,2,2];
	var Infix=new Array();
	var Postfix=new Array();
	var answer;
	Infix= makeArray(Input);
	Postfix= InToPost(Infix,Operators,Pre);
	answer=solvePost(Postfix);
	return answer;


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
function equal(){
	var n=document.getElementById("inp").value;

	if (n.charAt(0)=='s'){
		var i=3;
		var s='';
		while(i<n.length){
			s+=n.charAt(i);
			i=i+1;
		}
		document.Calculator.display.value = Math.sin(s * (Math.PI/180));
	}
	else if (n.charAt(0)=='c'){
		var i=3;
		var s='';
		while(i<n.length){
			s+=n.charAt(i);
			i=i+1;
		}
		document.Calculator.display.value = Math.cos(s * (Math.PI/180));
	}
	else if (n.charAt(0)=='t'){
		var i=3;
		var s='';
		while(i<n.length){
			s+=n.charAt(i);
			i=i+1;
		}
		document.Calculator.display.value = Math.tan(s);//(Math.sin(s * (Math.PI/180)))/(Math.cos(s * (Math.PI/180)));
	}
	else if (n.charAt(0)=='l'){
		var i=3;
		var s='';
		while(i<n.length){
			s+=n.charAt(i);
			i=i+1;
		}
		document.Calculator.display.value = Math.log10(n);
	}
	else if(n.charAt(0)=='√'){
		var i=1;
		var s='';
		while(i<n.length){
			s+=n.charAt(i);
			i=i+1;
		}		
		document.Calculator.display.value = Math.sqrt(s);		
	}
	else if(n.charAt(n.length-2)=='^' && n.charAt(n.length-1)=='3'){
		var i=0;
		var s='';
		while(i<n.length-2){
			s+=n.charAt(i);
			i=i+1;
		}
		var cube = s*s*s;
		document.Calculator.display.value = cube;
	}
	else if(n.charAt(n.length-2)=='^' && n.charAt(n.length-1)=='2'){
		var i=0;
		var s='';
		while(i<n.length-2){
			s+=n.charAt(i);
			i=i+1;
		}
		var square = s*s;
		document.Calculator.display.value = square;
	}
	else if(n.charAt(n.length-1)=='!'){
		var i=0;
		var s='';
		while(i<n.length-1){
			s+=n.charAt(i);
			i=i+1;
		}
		var fac=1;
		for (i=1; i<=s; i++){
			fac*=i;
		}			
		document.Calculator.display.value = fac;
	}
	else{
		document.Calculator.display.value = MyEval();//eval(document.Calculator.display.value);
	}

}