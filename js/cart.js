var wm = new Vue({
	el:"#app",
	data:{
		totalMoney:0,
		productList:[],
		checkAllflag:false,
		delFlag:false,
            productNum:false
	},
	filters:{
		formatMoney:function(value) {
			return "￥"+value.toFixed(2);// body...
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.cartView();//则此时this.cartView也可换成vm.cartView
 //(从本质上来说this和vm是一样的，但是因为mounted钩子函数并不能保证vm已经加载完	                //所以需要加上nextTick函数)
		});
	},
	methods:{
       cartView:function(){
        var _this=this;
       	this.$http.get("data/cartData.json",{"id":123}).then(function(res){
       		_this.productList=res.data.result.list;
       		//_this.totalMoney =res.data.result.totalMoney;

       	});
       },
       changeMoney:function(product,flag){
       	if (flag==-1) {
       		 product.productQuantity--;
       		if(product.productQuantity<1)
               {product.productQuantity=1;
               this.productNum=true;}
       	} else {
       		product.productQuantity++;
       	}
       	this.calcTotalmoney();
       },
       selectProduct:function(product){
       	if(typeof product.checked=='undefined'){
       		Vue.set(product,"checked",true);
       	}else{
       		product.checked=!product.checked;
       	}
       	this.calcTotalmoney();
       },
       checkAll:function() {
       	this.checkAllflag=!this.checkAllflag;
       	var _this=this;
       	this.productList.forEach(function(item,index){
       	if(typeof item.checked=='undefined'){
       		_this.$set(item,"checked",_this.checkAllflag);
       	}else{
       		item.checked=_this.checkAllflag;
       	}// body...	
       	});
       	this.calcTotalmoney();
       },
       calcTotalmoney:function(){
       	var _this=this;
       	this.totalMoney=0;
       	this.productList.forEach(function(item,index){
       		if(item.checked){
       			_this.totalMoney+=item.productPrice*item.productQuantity;

       		}
       	});
       },
      delProduct: function(){
      	this.productList.splice(this.pindex,1);
      	this.delFlag = false;
      } 
    }
});