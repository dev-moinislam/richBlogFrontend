export const checkPassword = (password: string, cf_password: string) => {
    if(password.length < 6){
      return ("Password must be at least 6 chars.")
    }else if(password !== cf_password){
      return ("Password did not match.")
    }
  }