//Create Schema for Todo Model

const { default: mongoose } = require("mongoose");

const Schema =  new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
},{
    timeStamp: true
});

const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema); //这段代码的意思是如果已经有了todo这个model就直接使用，如果没有就创建一个新的model

export default TodoModel;  