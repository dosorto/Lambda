export const handler = async (event, context) => {
    let body;
    let statusCode = 200;
    var users = [{
      id: 1,
      name: "user01",
      email:"user01@user.com",
    },{
      id: 2,
      name: "user02",
      email:"user02@user.com",
    },{
      id: 3,
      name: "user03",
      email:"user03@user.com",
    },
  ];
    const headers = {
      "Content-Type": "application/json",
    };
  
    try {
      switch (event.routeKey) {
          case "GET /":
              statusCode=200;
              body= {message:"WELCOME TO API REST LAMBDA + API GATEWAY"};
          break;
        case "GET /user":
            statusCode=200;
            body= users;
          break;
        case "GET /user/{id}":
          for(var i=0;i<users.length;i++){
              if(users[i].id == event.pathParameters.id){
                  statusCode = 200;
                  body = {message:"Success to get!",user:users[i]};
              }
          }
          break;
        case "POST /user":
          let requestJSON = JSON.parse(event.body);
           statusCode = 200;
           body= {message:"Success to add!", user:{
              id:requestJSON.id ,
              name: requestJSON.name,
              email:requestJSON.email,
            }}
          
          break;
        case "PUT /user/{id}":
              let requestJSON2 = JSON.parse(event.body);
               statusCode = 200;
               
               body= {message:"Success update!", user:{
                  id:event.pathParameters.id ,
                  name: requestJSON2.name,
                  email:requestJSON2.email,
                }}
              
              break;
          case "DELETE /user/{id}":
              
                  statusCode = 200;
                  for(var i=0;i<users.length;i++){
                      if(users[i].id == event.pathParameters.id){
                          statusCode = 200;
                          body = {message:"Success delete!",user:users[i]};
                      }
                  }
              
              break;
        
        default:
          throw new Error(`Unsupported route: "${event.routeKey}"`);
      }
    } catch (err) {
      statusCode = 400;
      body = err.message;
    } finally {
      body = JSON.stringify(body);
    }
  
    return {
      statusCode,
      body,
      headers,
    };
  };
  