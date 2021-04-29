export default function({store,redirect}){
    if(!store.getters['auth/getuserjwt']){
        return redirect('/users/login')
    }
}