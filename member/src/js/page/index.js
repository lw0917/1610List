require(['./js/main.js'], function() {
	require(['mui'], function(mui) {
		mui.init();
		//滚动
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		mui.ajax("/api/list", {
			dataType: 'json',
			success: function(res) {
				if(res.code===0){
					renderList(res.msg)
				}
			}
		})
		function renderList(data){
			 var str='';
			 data.forEach(function(file){
				 str+=`<li class="mui-table-view-cell">
						${file.name}
						<div class="btns">
							<button type="button" class="mui-btn mui-btn-primary" data-id="${file._id}">
								查看详情
							</button>
							<button type="button" class="mui-btn mui-btn-danger" data-id="${file._id}">
								删除
							</button>
						</div>
					</li>`
			 })
			 document.querySelector('.list').innerHTML=str;
		}
		var btn=document.querySelector('.mui-icon-plus');
		 btn.addEventListener('tap',function(){
			 location.href="./page/add.html";
		 })
		 //点击查看详情界面
		mui('.list').on('tap','.mui-btn-primary',function(){
			var id = this.getAttribute('data-id');
			location.href="../../page/detail.html?id="+id;
		})
		
		//点击删除
		mui('.list').on('tap','.mui-btn-danger',function(){
			var id = this.getAttribute('data-id');
			var that = this;
			mui.confirm('是否确定删除？','提示',["取消","确定"],function(index){
				if(index.index === 1){
					mui.ajax('/api/del?id='+id,{
						success:function(res){
							console.log(res)
							if(res.code === 0){
								document.querySelector('.list').removeChild(that.parentNode.parentNode)
							}
						}
					})
				}
			})
		})
		
		
		
		
		
		
		
	})
})
