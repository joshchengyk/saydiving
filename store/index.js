import cookieparser from 'cookieparser'

export const actions = {

    nuxtServerInit({ commit }, { req }) {
  
        if (req && req.headers && req.headers.cookie){
  
          const parsed = cookieparser.parse(req.headers.cookie)

          if (parsed.userjwt == 'null'){             
            commit('auth/setUser', null)
            commit('auth/setFirstname' , null)
            commit('auth/setUsermail',null)}
          else{ 
            commit('auth/setUser', parsed.userjwt)
            commit('auth/setFirstname',parsed.firstname)
            commit('auth/setUsermail',parsed.usermail)
          }
  
        }
  
    }
  
  }