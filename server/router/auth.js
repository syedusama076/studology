const express = require('express');
const router = express.Router();
const StudentsModel = require('../models/Students.js');
const TeachersModel = require('../models/Teacher.js');
const AdminModel = require('../models/Admin.js');
const bcrypt = require('bcryptjs');
const cloudinary = require('../Utils/Cloudinary');
const LibraryBooksModel = require('../models/Librarybooks.js');
const { Router } = require('express');
const TasksModal = require('../models/Task');




router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.put('/update-student', async (req, res) => {
    const { _id, Name, Email, Phone, Address, StudentClass, Age } = req.body;
    try {
        // const UserData = await StudentsModel.findOne({ Email: Email });
        // if (UserData) {
        await StudentsModel.findByIdAndUpdate(_id,
            { Name, Phone, Address, StudentClass, Age });
        const updateUser = await StudentsModel.findOne({ Email: Email });
        res.status(200).send(updateUser);
        // }
    } catch (err) {
        res.send(console.error(err));
    }

});
router.put('/update-teacher', async (req, res) => {
    const { _id, Name, Email, Phone, Age, Address, City, Education, TeachingExperience, OnlineTeachingExperience, Description } = req.body;
    try {
        const UserData = await TeachersModel.findOne({ Email: Email });
        if (UserData) {
            await TeachersModel.findByIdAndUpdate(_id,
                { _id, Name, Email, Phone, Age, Address, City, Education, TeachingExperience, OnlineTeachingExperience, Description });
            const updateUser = await TeachersModel.findOne({ Email: Email });
            res.send(updateUser);
        }
    } catch (err) {
        console.error(err);
    }

});
router.put('/update-task', async (req, res) => {
    const { _id } = req.body;
    try {
        const TaskData = await TasksModal.findOne({ _id: _id });
        if (TaskData) {
            await TasksModal.findByIdAndUpdate(_id, req.body);
            const updateTask = await TasksModal.findOne({ _id: _id });
            res.send(updateTask);
        }
    } catch (err) {
        console.log(err);
    }
});
router.get('/my-profile', async (req, res) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const UserData = await StudentsModel.findOne({ 'tokens.token': token });
            const TeacherData = await TeachersModel.findOne({ 'tokens.token': token });
            const AdminData = await AdminModel.findOne({ 'tokens.token': token });
            if (UserData) {
                return res.send(UserData);
            } else if (TeacherData) {
                return res.send(TeacherData);
            } else if (AdminData) {
                return res.send(AdminData);
            }
        } else {
            console.log('Unauthorized token');
        }
    } catch (err) {
        console.log(err);
    }
    // res.send('Its All about me!');
});
router.get('/single-teacher-profile/:_id', async (req, res) => {

    const _id = req.params._id;
    const TeacherData = await TeachersModel.findOne({ _id });
    return res.send(TeacherData);
});
router.get('/all-tasks', async (req, res) => {
    TasksModal.find({}, (err, results) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(results);
        }
    });
});
router.post('/add-task', async (req, res) => {
    const { name, description, selected_student_id, login_teacher_id, task_status, task_assigned_date_and_time, column } = req.body;
    console.log(req.body);
    if (!name || !description || !selected_student_id || !login_teacher_id || !task_status || !task_assigned_date_and_time || !column) {
        console.log("Please enter all the required fields");
    }
    try {
        const taskAssignedExist = await TasksModal.findOne({ selected_student_id: selected_student_id });
        const taskDescriptionExist = await TasksModal.findOne({ description: description });
        if (taskAssignedExist && taskDescriptionExist) {
            return req.send(console.log("Please enter the valid task name or description"));
        }
        else {
            const taskData = await TasksModal({ name, description, selected_student_id, login_teacher_id, task_status, task_assigned_date_and_time, column });
            console.log(taskData);
            taskData.save();
            res.status(200).send("Task is inserted");
        }
    }
    catch (err) {
        console.error(err);
    }
});
router.post('/add-student', async (req, res) => {

    const { Name, Email, Phone, Age, Address, StudentClass, Password, cPassword } = req.body;

    if (!Name || !Email || !Phone || !Age || !Address || !StudentClass || !Password || !cPassword) {
        return res.status(202).send('Please enter all the required fields.');
    }
    try {
        const existUser = await StudentsModel.findOne({ Email: Email });
        const TeacherExist = await TeachersModel.findOne({ Email: Email });
        const AdminExist = await AdminModel.findOne({ Email: Email });
        if (existUser || AdminExist || TeacherExist) {
            return res.status(201).send(console.log('Please enter valid Email credentials.'));
        } else if (Password != cPassword) {
            return res.status(201).send(console.log('Please enter valid Password credentials.'));
        } else {
            const studentData = await StudentsModel({ Name, Email, Phone, Age, Address, StudentClass, Password, cPassword });
            await studentData.save();
            res.status(200).send("Data is inserted");
        }
    } catch (err) {
        console.error(err);
    }
});
router.post('/add-teacher', async (req, res) => {
    const { Name, Email, Phone, Age, Gender, Address, City, Education, TeachingExperience, OnlineTeachingExperience, TeachingSubject, Description, Password, cPassword } = req.body;
    // console.log(req.body)
    if (!Name || !Email || !Phone || !Age || !Gender || !Address || !City || !Education || !TeachingExperience || !OnlineTeachingExperience || !TeachingSubject || !Description || !Password || !cPassword) {
        return res.send('Please enter all the required fields.');
    }
    try {
        const teacherexist = await TeachersModel.findOne({ Email: Email });
        const studentexist = await StudentsModel.findOne({ Email: Email });
        const adminexist = await AdminModel.findOne({ Email: Email });
        if (teacherexist || adminexist || studentexist) {
            // console.log("teacherexist.email");
            return res.status(201).send(console.log('Please enter valid Email credentials.'));
        } else if (Password != cPassword) {
            return res.status(201).send(console.log('Please enter valid Password credentials.'));
        } else {
            const teacherData = await TeachersModel({ Name, Email, Phone, Age, Gender, Address, City, Education, TeachingExperience, OnlineTeachingExperience, TeachingSubject, Description, Password, cPassword });
            await teacherData.save();
            res.status(200).send("Data is inserted");
        }
    } catch (err) {
        console.error(err);
    }
});
router.post('/signin', async (req, res) => {
    try {
        let token;
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(404).send("Enter Your Credentials");
        }
        const userLogin = await StudentsModel.findOne({ Email: Email });
        if (userLogin) {
            const passwordMatch = await bcrypt.compare(Password, userLogin.Password);
            if (passwordMatch) {
                token = await userLogin.generateAuthToken();
                return res.status(200).send({
                    status: "Login Successfully",
                    data: userLogin,
                    token: token
                });
            } else if (!passwordMatch) {
                return res.status(404).send('invalid Password Credentials');
            } else {
                return res.status(404).send('invalid Email Credentials');
            }
        }
        const teacherLogin = await TeachersModel.findOne({ Email: Email });
        if (teacherLogin) {
            const teacherPasswordMatch = await bcrypt.compare(Password, teacherLogin.Password);
            if (teacherPasswordMatch) {
                token = await teacherLogin.generateAuthToken();
                return res.status(200).send({
                    status: "Login Successfully",
                    data: teacherLogin,
                    token: token
                });
            } else if (!teacherPasswordMatch) {
                return res.status(404).send('invalid Password Credentials');
            } else {
                return res.status(404).send('invalid Email Credentials');
            }
        }
    } catch (err) {
        console.error(err);
    }
});
router.get('/all-teachers', async (req, res) => {
    TeachersModel.find({}, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
});
router.get('/all-students', async (req, res) => {
    StudentsModel.find({}, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
});
router.post('/update-img', async (req, res) => {
    try {
        const { _id } = req.body;
        const file = req.files.file;
        const result = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        });
        const user = await TeachersModel.findOne({ _id: _id });
        const userStudent = await StudentsModel.findOne({ _id: _id });
        const userAdmin = await AdminModel.findOne({ _id: _id });
        if (user) {
            await TeachersModel.findByIdAndUpdate(_id, { Image: result.url });
            const userData = await TeachersModel.findOne({ _id: _id });
            return res.send(userData);
        } else if (userStudent) {
            await StudentsModel.findByIdAndUpdate(_id, { Image: result.url });
            const userData = await StudentsModel.findOne({ _id: _id });
            return res.send(userData);
        } else if (userAdmin) {
            await AdminModel.findByIdAndUpdate(_id, { Image: result.url });
            const userData = await AdminModel.findOne({ _id: _id });
            return res.send(userData);
        } else {
            return res.send("Error uploading");
        }
    } catch (error) {
        console.error(error);
    }
});
router.post('/admin-login', async (req, res) => {
    try {
        let token;
        const { UserName, Password } = req.body;
        if (!UserName || !Password) {
            return res.status(404).send("Enter Your Credentials");
        }
        const userLogin = await AdminModel.findOne({ UserName: UserName });
        if (userLogin) {
            const passwordMatch = await bcrypt.compare(Password, userLogin.Password);
            if (passwordMatch) {
                token = await userLogin.generateAuthToken();
                return res.status(200).send({
                    status: "Login Successfully",
                    token: token
                });
            } else if (!passwordMatch) {
                return res.status(404).send('invalid Password Credentials');
            } else {
                return res.status(404).send('invalid Email Credentials');
            }
        }
    } catch (error) {
        res.send(error);
    }
});
router.post('/admin-signup', async (req, res) => {
    const { Name, Email, UserName, Phone, Password, cPassword } = req.body;
    if (!Name || !UserName || !Email || !Phone || !Password || !cPassword) {
        return res.send('Please enter all the required fields.');
    }
    try {
        const adminexist = await AdminModel.findOne({ Email: Email, UserName: UserName });
        const existUser = await StudentsModel.findOne({ Email: Email });
        const TeacherExist = await TeachersModel.findOne({ Email: Email });
        if (adminexist || existUser || TeacherExist) {
            console.log("admin exist email");
            return res.send(console.log('Please enter valid Email credentials.'));
        } else if (Password != cPassword) {
            return res.send(console.log('Please enter valid Password credentials.'));
        } else {
            const adminData = await AdminModel({ Name, Email, UserName, Phone, Password, cPassword });
            await adminData.save();
            res.send("Data is inserted");
        }
    } catch (err) {
        console.error(err);
    }
});
router.get('/admin-dashboard', async (req, res) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            const UserData = await StudentsModel.findOne({ 'tokens.token': token });
            const TeacherData = await TeachersModel.findOne({ 'tokens.token': token });
            const AdminData = await AdminModel.findOne({ 'tokens.token': token });
            if (UserData) {
                return res.send(UserData);
            } else if (TeacherData) {
                return res.send(TeacherData);
            } else if (AdminData) {
                return res.send(AdminData);
            }
        } else {
            console.log('Unauthorized token');
        }
    } catch (err) {
        console.log(err);
    }
    res.send('Its All about me!');
});
router.delete('/students-delete/:id', async (req, res) => {
    try {
        // console.log(req.params.id)
        const _id = req.params.id;
        console.log(_id);
        const deletuser = await StudentsModel.findByIdAndDelete({ _id: _id });
        res.status(201).send("deletuser");
        // console.log(id)
    } catch (err) {
        res.send(err);
    }
});
router.delete('/teachers-delete/:id', async (req, res) => {
    try {
        // console.log(req.params.id)
        const _id = req.params.id;
        console.log(_id);
        const deletuser = await TeachersModel.findByIdAndDelete({ _id: _id });
        res.status(201).send("deletuser");
        // console.log(id)
    } catch (err) {
        res.send(err);
    }
});
router.delete('/delete-task', async (req, res) => {
    // console.log(req);
    // console.log(req.body.source._id);
    const { _id } = req.body.source;
    console.log(_id);
    try {
        const TaskData = await TasksModal.findOne({ _id: _id });
        console.log(TaskData);
        if (TaskData) {
            const deletedTask = await TasksModal.findByIdAndDelete(_id);
            console.log(deletedTask);
            if (!_id) {
                console.log("bad request");
            }
            // await TasksModal.findOne({ _id: _id });
            res.send(deletedTask);
        }
    } catch (err) {
        console.log(err);
    }
});
router.post('/add-book', async (req, res) => {
    try {
        const { BookName, Class, Semester } = req.body;
        const file = req.files.file;
        const image = req.files.image;
        if (!BookName || !Class || !file) {
            return res.status(202).send('Please enter all the required fields.');
        } else {
            const fileResult = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            });
            const imageResult = await cloudinary.uploader.upload(image.tempFilePath, (err, result) => {
            });
            const FilePath = fileResult.url;
            const ThumbnailPath = imageResult.url;
            const BookData = await LibraryBooksModel({ BookName, Class, Semester, ThumbnailPath, FilePath });
            await BookData.save();
            res.status(200).send("Book is Uploaded successfully !");
        }
    } catch (error) {
        console.error(error);
    }
});
router.get('/all-book', async (req, res) => {
    LibraryBooksModel.find({}, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results);
        }
    });
});
router.get('/class-book/:Class', async (req, res) => {
    try {
        const Class = req.params.Class;
        const Book = await LibraryBooksModel.find({ Class: Class });
        res.status(200).send(Book);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;