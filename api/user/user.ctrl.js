//api logics

var users = [
    {id:1, name:'Alice' },
    {id:2, name:'Beyonce'},
    {id:3, name:'Cellie'}
]

const index = function(req, res)
{
    //req.query.limit is string
    req.query.limit = req.query.limit || users.length;
    var limit = req.query.limit;
        if(!isNaN(limit)){
            res.json(users.slice(0,limit));
        }
        else{
            return res.status(400).send('Bad request\n');
        }
        
 
}

const find = function(req, res){
    
    var id=  parseInt(req.params.id, 10);

    if(isNaN(id)) return res.status(400).end();

    const user = users.filter((user)=> user.id===id)[0];

    if(!user) return res.status(404).end();
    
    res.json(user);



}

const destroy = function (req, res){
    const id = parseInt(req.params.id,10);

    if(isNaN(id)){return res.status(400).end();}
    
    users= users.filter((user)=> user.id!==id); //oeverwrit deleting a user
    res.status(204).end();

}

const create = function (req, res){
    const name = req.body.name;

    if(!name)return res.status(400).end();
    
    var isConflict= users.filter((user)=>{
        {return user.name===name}
    }).length;

    if(isConflict) return res.status(409).end();

    const id = Date.now();
    const user ={id, name};
    users.push(user);
    res.status(201).json(user);
}

const update = function(req, res){

    //takes id, and body {name}
    const id = parseInt(req.params.id,10);
    const name = req.body.name;
    //400 - id wrong 
    if(isNaN(id)) return res.status(400).end();

    //400 - name wrong
    
    if(!name) return res.status(400).end();
    if(!isNaN(parseInt(name))) return res.status(400).end();
    
    //string,number, boolean, null, undefined, 
    //if there is no matching element, it will return empty array
    //so user[0] is undefined;
    //404    
    const user = users.filter(user=> user.id === id)[0];
    if(!user) return res.status(404).end();
    
    const isConflict = users.filter(user=>user.name===name).length;
    if(isConflict) return res.status(409).end(); 

    //success
    user.name = name;
    res.json(user);
    
}


module.exports={
    index,
    find,
    destroy,
    create,
    update

}