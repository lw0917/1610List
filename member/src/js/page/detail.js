require(['../js/main.js'],function(){
	 require(['mui'],function(mui){
		// ObjectId("5c2c5400886f951a6c26f425")
		var url=JSON.parse('{"'+decodeURI(location.search).slice(1).replace('&','"="').replace('=','":"')+'"}');
			mui.ajax('/api/findOne?id='+url.id,{
				success:function(res){
					console.log(res)
					if(res.code===0){
						document.querySelector('.name').innerHTML=res.msg.name;
						document.querySelector('.age').innerHTML=res.msg.age;
						document.querySelector('.phone').innerHTML=res.msg.tyep;
						document.querySelector('.title').innerHTML=res.msg.title;
					}
				}
			})  
		
	    var btn=document.querySelector('.edit-btn');
		btn.addEventListener('tap',function(){
			location.href='./add.html?id='+url.id;
		});
		
	 })
})