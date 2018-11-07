const Task = require('../models/taskModel');
const Result = require('../models/resultModel');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

const getResult = async (ctx) => {
  const data = await Result.find({}).populate('items').exec();
  ctx.sendCreated(data);
};

const getAll = async (ctx) => {
  const data = await Task.find({});
  ctx.sendCreated(data);
};


const createTask = async ({ sendCreated, sendError, request: { body } }) => {
    if (body.imageURL) {
      const result = await cloudinary.uploader.upload(body.imageURL);
      body.imageURL = result.secure_url;
    }
    const task = await Task.create(body);
    sendCreated(task);
};

const updateTask = async ({ sendCreated, sendError, request: { body }, params: { id }, user }) => {
  try {
    const task = await Task.findById(id);
    if (task) {
      if (body.imageURL) {
        const result = await cloudinary.uploader.upload(body.imageURL);
        body.imageURL = result.secure_url;
      }

      const newTask = await Task.findOneAndUpdate({ _id: id }, { $set: { ...body, date: new Date() } }, { new: false });
      sendCreated(newTask);
    } else {
      sendError('Something went wrong');
    }
  } catch (e) {
    console.log(e.message);
  }
};

const deleteTask = async ({ sendSuccess, params: { id } }) => {
  await Task.findByIdAndDelete(id);
  sendSuccess();
};

module.exports = {
  getAll, createTask, updateTask, deleteTask, getResult
};
