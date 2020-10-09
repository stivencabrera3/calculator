const display = document.querySelector('.display')
const clear_btn = document.querySelector('#clear-btn')
const numbers_btn = document.querySelectorAll('.numbers')
const add_btn = document.querySelector('#add-btn')
const equal_btn = document.querySelector('#equal-btn')
const operation_btns = document.querySelectorAll('.operations')
const percent_btn = document.querySelector('#percent-btn')
const neg_btn = document.querySelector('#neg-btn')


let values = []
let str_val = ''
let last_operation = null
let last_num = null



function clear_display(){

    clear_btn.addEventListener('click', function(){
        values = []
        str_val = ''
        last_num = null
        last_operation = null
        render_display()
        
    })   
}
function render_display(display_text=0){
    display.textContent = ''
    display.textContent = display_text
}
function multiplication() {
    while(values.includes('x')){
        let i = values.indexOf('x')
    
        a = Number(values[i-1])
        b = Number(values[i+1])
    
        result=a*b
        values.splice(i-1,i+2,result)

        last_operation = 'x'
        last_num = b
    }
}
function division() {
    while(values.includes('÷')){
        let i = values.indexOf('÷')
    
        a = Number(values[i-1])
        b = Number(values[i+1])
    
        result=(a/b)
    
        values.splice(i-1,i+2,result)

        last_operation = '÷'
        last_num = b
    }
}
function addition(){
    while(values.includes('+')){
        let i = values.indexOf('+')
    
        a = Number(values[i-1])
        b = Number(values[i+1])
    
        result=a+b
    
        values.splice(i-1,(i+2),result)

        last_operation = '+'
        last_num = b
    }
}
function subtraction(){
    while(values.includes('-')){
        let i = values.indexOf('-')
    
        a = Number(values[i-1])
        b = Number(values[i+1])
    
        result=a-b
    
        values.splice(i-1,(i+2),result)

        last_operation = '-'
        last_num = b
    }
}
function operations(){
    
    multiplication()
    division()
    addition()
    subtraction()
    


    return values[0]

    
}

render_display()




neg_btn.addEventListener('click',function(){
    //adding - when typing a number
    if(!str_val.includes('-') && display.textContent !== '0' && values.length!== 1){
        str_val = '-' + str_val
        render_display(str_val)
    }
    //adding a - when pressed on clear or new session
    if(display.textContent === '0'){
        str_val = '-' + str_val
        display.textContent = '-' + '0'
    }

    //adding a - to result of calcution
        //bug: can add multile -'s
    if (values.length === 1) {
        values[0] = '-' + values[0]
        render_display(values[0])
        
    }

})

numbers_btn.forEach(btn => {
    btn.addEventListener('click',function(){
        if (values.length === 1){
            values = []
        }

        str_val+=this.value
        render_display(str_val)
    })
});

operation_btns.forEach(btn => {
    btn.addEventListener('click',function(){
        
        if (str_val.length !== 0){
            values.push(str_val)
            str_val = ''
            values.push(this.value)

        }
        else{
            //fixes the inifnite loop bug with clicking operators btn with nothing in values
            if (values.length===0) {
                //pass
            }
            else{
                values.push(this.value)
            }
            
        }
    })
});


equal_btn.addEventListener('click', function(){
    
    if(values.length === 1){
        values.splice(1,0,last_operation,last_num)
        render_display(display_text = operations())
    }
    //fixes the 0 disappearing on display when pressing equals on clear or start bug
    else if (values.length === 0){
        render_display()
    }

    else{
        values.push(str_val)
        render_display(display_text = operations())
        str_val = ''
    }
})

percent_btn.addEventListener('click',function(){

    if (display.textContent !== '0' && values.length === 0) {
        str_val /=100 

        render_display(str_val)
    } 

    else if(display.textContent !=='0' && values.length > 1){
        str_val /=100 

        render_display(str_val)
    }

    else if (values.length === 1){
        str_val = (values[0]/100)
        values.splice(0,1,str_val)
        render_display(str_val)
        str_val=''
    }

})




clear_display()
