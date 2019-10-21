//http test code 
const request = require('supertest'); //testing library
const should = require('should'); //assertion library
const app = require('../../index'); //import script to be tested


//variables
var id = 1;
var limit = 2;
var str = 'abcd'; 
var idNotFound = 77;

var nameConflict ='Alice';
var namePost='Denial';
var namePut = 'Babaraman';


//GET all
describe('GET /users', ()=>{
    
    describe('#Success',()=>{
        it('should return an array', (done)=>{
            request(app) //runs server internally
            .get('/users')
            .end((err, res)=>{
                res.body.should.be.instanceOf(Array);
                done();
            })
        }) 
        
        it(`should return 1)array 2)array.length = ${limit}`,(done)=>{
            request(app)
            .get(`/users?limit=${limit}`)
            .end((err, res)=>{
                res.body.should.have.lengthOf(limit);
                done();
            })
        })
    })
    
    describe('#Failure', ()=>{
        it(`should return 400, if typeof ${str} != number `, (done)=>{
            request(app)
            .get(`/users?limit=${str}`)
            .expect(400)
            .end(done)
        })
    })   
    
})

//GET one by id
describe('GET /users/:id', ()=>{
    
    
    describe('#Success', ()=>{
        it(`should return an object where id=${id}` ,(done)=>{
            request(app).
            get(`/users/${id}`).
            end((err, res )=>{
                res.body.should.have.property('id',id);
                nameConflict = res.body.name;// should return name where id=1
                done();
            })
        })
    })
    
    describe('#Faliure', ()=>{
        it(`should return 400 if typeof id:${str} != number`,(done)=>{
            request(app)
            .get('/users/'+str)
            .expect(400).end(done);
        })
        
        it(`should return 404 if no matching name with id:${idNotFound}` ,(done)=>{
            request(app)
            .get('/users/' + idNotFound)
            .expect(404)
            .end(done);
        })
    })
    
    
})

//POST(create) one
describe('POST /users', ()=>{
    describe('#Sucsess' ,()=>{
        let  body;
        before((done)=>{
            request(app)
            .post('/users')
            .send({name:namePost}) //body
            .expect(201)
            .end((err, res)=>{
                body = res.body;
                done();
            });
        })
        it('should return created id', ()=>{
            body.should.have.property('id');
        })
        
        it('should return created name:' + namePost,()=>{ 
            body.should.have.property('name', namePost)
        })
        
    })
    
    
    describe('#Failure', ()=>{
        it('should return 400 if name == null' ,(done)=>{
            request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done);
        });
        
        it(`should return 409, if name:${nameConflict} conflict`,(done)=>{
            request(app)
            .post('/users')
            .send({name: nameConflict})
            .expect(409)
            .end(done);
            
        });
    })
    
})


//PUT(update) one by id
describe('PUT /users/:id', ()=>{
    
    
    describe('#Failure', ()=>{
        
        it('should return 400 if typeof id:'+str+' != number', (done)=>{
            request(app)
            .put('/users/'+ str)
            .send({name: namePut})
            .expect(400)
            .end(done);
        })
        
        it('should return 400 if typeof name:'+id+' != string', (done)=>{
            request(app)
            .put('/users/'+ id)
            .send({name:id})
            .expect(400)
            .end(done);
        })
        
        it('should return 400 if typeof name is null', (done)=>{
            request(app)
            .put('/users/'+ id)
            .send({})
            .expect(400)
            .end(done);
        })
        
        
        it('should return 404 if no matching name with id:' +idNotFound, (done)=>{
            request(app)
            .put('/users/' + idNotFound)
            .send({name: namePut})
            .expect(404)
            .end(done);
        })
        
        
        it(`should return 409 if name:${nameConflict} conflict`, (done)=>{
            request(app)
            .put('/users/'+id)
            .send({name: nameConflict})
            .expect(409)
            .end(done);
        })
    })
    
    
    
    describe('#Success', ()=>{
    it('should return updated name:' + namePut, (done)=>{
        request(app)
        .put('/users/'+id)
        .send({name: namePut})
        .end((err, res)=>{
            res.body.should.have.property('name',namePut);
            done();
        })
    })
    })  
    
    
})



//DELETE by id
describe('DELETE /users/1',()=>{
    
    describe('#Success', ()=>{
        it('should return 204', (done)=>{
            request(app)
            .delete('/users/'+ id)
            .expect(204)
            .end(done);
        })
        
    })
    
    describe('#Failure', ()=>{
        it('should return 400 if typeof id:'+str+ ' != number', (done)=>{
                    request(app)
                        .delete('/users/' + str)
                        .expect(400)
                        .end(done);
                })
            })
        
            
   })