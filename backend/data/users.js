import bcrypt from 'bcryptjs'

const users=
    [
        {
            name:"sahil",
            email:"sahil@gmail.com",
            password:bcrypt.hashSync("123456",10),
            isAdmin:true
        },
        {
            name:"sah",
            email:"sah@gmail.com",
            password:bcrypt.hashSync("123456",10),
            
        },
        {
            name:"goldy",
            email:"goldy@gmail.com",
            password:bcrypt.hashSync("123456",10),
            isAdmin:true
        },
    ]


    export default users