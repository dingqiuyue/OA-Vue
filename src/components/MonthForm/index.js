define(function (require, exports, module) {
    "use strict";
    var temp = require("./temp.html");
    module.exports = {
        name: "Template",
        template: temp,
        data() {
            return {
                ruleForm: {
                    cycle: '2018年5月绩效考核',
                    dep: '',
                    date: '',
                    position: '',
                    initiator: ''
                },
                rules: {
                    dep: [
                        { required: true, message: '请选择所属部门', trigger: 'change' }
                    ],
                    date: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    position: [
                        { required: true, message: '请输入职位', trigger: 'blur' }
                    ],
                    initiator: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                department: [
                    { name: '人力行政部', value: 'renli' },
                    { name: '大数据中心', value: 'dashuju' },
                    { name: '档案数据工程部', value: 'danganshuju' },
                    { name: '测绘工程部', value: 'cehui' },
                    { name: '财务部', value: 'caiwu' },
                    { name: '商务部', value: 'shanwu' },
                    { name: 'GIS工程部', value: 'GIS' },
                    { name: '产品规划与项目管理部', value: 'chanping' },
                    { name: '软件研发部', value: 'ruanjian' },
                ]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
});