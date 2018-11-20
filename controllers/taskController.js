const Task = require('../models/taskModel');
const User = require('../models/userModel');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');


const getAll = async (ctx) => {
  if (ctx.user) {
    const data = await Task.find({ user: ctx.user._id });
    ctx.sendOK({ data });
  } else {
    ctx.sendError('no user found');
  }
};

const getResult = async (ctx) => {
   if (ctx.user) {
    const user = await User.findById(ctx.user._id);
    ctx.sendOK({ data: user.result });
  } else {
    ctx.sendError('no user found');
  }
};


const createTask = async ({ user, sendCreated, sendError, request: { body } }) => {
  if (user) {
    try {
      body.user = user._id;
      if (body.image) {
        const result = await cloudinary.uploader.upload(body.image);
        body.image = result.secure_url;
      }
      const newTask = await Task.create(body);
      const foundUser = await User.findById(user._id);
      const updatedResult = {
        ...foundUser.result,
        credit: foundUser.result.credit + body.cost
      };
      await User.findByIdAndUpdate(user._id, { $set: { result: updatedResult } }, { new: true });
      sendCreated({ data: newTask });
    } catch (e) {
      sendError(e.message);
    }
  } else {
    sendError('no user found');
  }
};

const updateTask = async ({ sendCreated, sendError, request: { body }, params: { id }, user }) => {
  try {
    const task = await Task.findById(id);
    if (task && user) {
      if (body.image) {
        const result = await cloudinary.uploader.upload(body.image);
        body.image = result.secure_url;
      }
      const deltaCost = body.cost ? body.cost - task.cost : 0;
      const foundUser = await User.findById(user._id);
      const updatedResult = {
        ...foundUser.result,
        credit: foundUser.result.credit + deltaCost
      };
      await User.findByIdAndUpdate(user._id, { $set: { result: updatedResult } }, { new: true });
      const newTask = await Task.findOneAndUpdate({ _id: id }, { $set: { ...body, date: new Date() } }, { new: false });
      sendCreated({data: newTask});
    } else {
      sendError('Something went wrong');
    }
  } catch (e) {
    console.log(e.message);
  }
};

const deleteTask = async ({ user, sendSuccess, params: { id } }) => {
  if (user) {
    await Task.findByIdAndDelete(id);
    sendSuccess();
  }
};

module.exports = {
  getAll, createTask, updateTask, deleteTask, getResult
};
