new Vue({
	el:".container",
	data:{
		limitNum:3,
		addressList:[],
		currentIndex:0,
		moreFlag:false,
		deladdressFlag:false,
		editaddressFlag:false,
		shippingMethod:1,
		pindex:0,
		newAddress:
		  {
		    newuserName:' ',
		    newstreetName:' ',
		    newTel:' '
		  },
		saveaddressFlag:false,
		savenewAddress:
             {
                 addressId:" ",
                 userName:" ",
                 streetName:" ",
                 postCode:" ",
                 tel:" ",
                 isDefault:false
              }  
	},
	mounted:function(){
		this.$nextTick(function(){
			this.addressView();
		});
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		addressView:function(){
        var _this=this;
       	this.$http.get("data/address.json").then(function(res){
       		if(status==0)
       		_this.addressList=res.data.result;//
       		//_this.totalMoney =res.data.result.totalMoney;

       	});
       },
       displayMore:function(){
       	this.moreFlag=!this.moreFlag;
       	if(this.moreFlag){
       		this.limitNum=this.addressList.length;
       	}
       	else{
       		this.limitNum=3;
       	} 
       },
       setDefault:function(item){
       	this.addressList.forEach(function(address,index){
       		if(address.addressId==item.addressId){
       			address.isDefault=true;
       		}else{
       			address.isDefault=false;
       		}
       	});
       },
       delAddress:function(){
       	this.addressList.splice(this.pindex,1);
       	this.deladdressFlag=false;
       },
       editAddress:function(index){
       	this.addressList[index].userName=this.newAddress.newuserName;
         	this.addressList[index].streetName=this.newAddress.newstreetName;
        	this.addressList[index].tel=this.newAddress.newTel;
       	this.editaddressFlag=false;
       },

       saveAddress:function(){
            this.limitNum=this.addressList.length+1;
            this.addressList=this.addressList.concat(this.savenewAddress);
            //savenewAddress如果设置为数组，则不能直接使用savenewAddress.userName去绑定文本框的值
            //如果为数组去绑定，则应写为savenewAddress[index].userName
            this.saveaddressFlag=false;
            this.moreFlag=true;

       }
      
	}
})