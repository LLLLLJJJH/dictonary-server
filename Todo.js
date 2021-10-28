const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({//��Ű�� ����
    name: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true }
})


module.exports = todoSchema;