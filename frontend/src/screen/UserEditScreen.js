import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button} from 'react-bootstrap' 
import {useDispatch,useSelector} from 'react-redux'
import  Loader from '../components/Loader.js'
import {getUserDetails,updateUser} from '../actions/userAction.js'
import FormContainer from '../components/FormContainer.js'
import {USER_UPDATE_RESET} from '../constant/userConstant'

const UserEditScreeen = ({match,location,history}) => {

    const userId=match.params.id

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [isAdmin,setIsAdmin]=useState(false)
    
    
    const dispatch=useDispatch();
  
    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails

    const userUpdate=useSelector(state=>state.userUpdate)
    const {loading:laodingUpdate,error:errorUpdate,success:successUpdate}=userUpdate
   
    useEffect( ()=>{
        if(successUpdate)
        {
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !==userId )
            {
                dispatch(getUserDetails(userId));
            }else{
                setIsAdmin(user.isAdmin)
                setEmail(user.email)
                setName(user.name)
            }
        }
       
    }, [user ,dispatch, successUpdate])

    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(updateUser({_id:userId,name,email,isAdmin}));
    }

    return (
        <>

        <Link to='/admin/userlist' className='btn btn-light my-3' >Go Back</Link>

        <FormContainer>
             <h1>Edit User</h1>

             {laodingUpdate && <Loader/> }
             {error && <h3>Not Updated</h3>}
             
             {loading ? <Loader/> : error ? <h1>UserNotFound</h1> :(

             
             <Form onSubmit={submitHandler}>
                 <Form.Group controlId="name">
                    <Form.Label >Name</Form.Label>
                    <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type='name' placeholder='name'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="email">
                    <Form.Label >Email Address</Form.Label>
                    <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email'></Form.Control>
                 </Form.Group>
                 <Form.Group controlId="isadmin">
                  
                    <Form.Check label='Is Admin' checked={isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)} type='checkbox' ></Form.Check>
                 </Form.Group>
                 
                <Button variant='primary' type='submit'>Update</Button>
             </Form>

             )}
            

        </FormContainer>
        </>
    )
}

export default UserEditScreeen
