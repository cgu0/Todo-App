import { NextResponse } from "next/server";
import { ConnectDB } from "../../lib/config/db";
import TodoModel  from "../../lib/models/TodoModel";

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function GET(request: Request){
    const todos = await TodoModel.find({}); //Find all todos
    return NextResponse.json({todos:todos}) //Return all todos
}



export async function POST(request: Request){
    const {title,description} = await request.json();
    await TodoModel.create({
        title,
        description
    });
    return NextResponse.json({msg:'Todo Created'})
}

//删除Todos
//1. 首先在Router里创建一个DELETE路由，接受前端传递过来的mongoId，接着在数据库中删除对应的todo，并返回一个成功的消息
//2. 接着在前端创建一个deleteTodo函数，用来删除todo，这个函数会接受一个mongoId，接着使用axios.delete函数，将mongoId传递给后端，最后在删除todo成功后，重新获取todo数据
//3. 最后在Todo组件中，创建一个删除按钮，用来调用deleteTodo函数
//4. 这样就可以实现删除todo的功能了

export async function DELETE(request:any){ 
    const mongoId = await request.nextUrl.searchParams.get('mongoId'); //这段代码会获取到前端传递过来的mongoId
    await TodoModel.findByIdAndDelete(mongoId); //这段代码会根据mongoId删除数据库中的todo
    return NextResponse.json({msg:'Todo Deleted'})
}


//更新Todos
//1.首先在Router里创建一个PUT路由，接受前端传递过来的mongoId，接着在数据库中更新对应的todo，并返回一个成功的消息
//2. 接着在前端创建一个updateTodo函数，用来更新todo，这个函数会接受一个mongoId，接着使用axios.put函数，将mongoId传递给后端，最后在更新todo成功后，重新获取todo数据
//3. 最后在Todo组件中，创建一个更新按钮，用来调用updateTodo函数
//4. 这样就可以实现更新todo的功能了

export async function PUT(request:any){
    const mongoId = await request.nextUrl.searchParams.get('mongoId'); //这段代码会获取到前端传递过来的mongoId
    await TodoModel.findByIdAndUpdate(mongoId,{isCompleted:true}); //这段代码会根据mongoId更新数据库中的todo,接受的第二段参数是一个对象，用来更新todo的内容
    return NextResponse.json({msg:'Todo Updated'})
}
