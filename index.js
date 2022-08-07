
var prog = {
	
	
	
	login : function()	{

		let local_uid = '';

		try {local_uid = localStorage.getItem('login')} catch(e){};
		local_uid = local_uid || '';
		
		local_uid = prompt('Введите логин', local_uid);
		if (local_uid !== '') {
			try {localStorage.setItem('login', local_uid)} catch(e){}
		}



		let k1='AKIAVLPJFT'
		let k2='NLDJX2T6P6'
		let k3='3BoFcUz1hYsWSn6N1'
		let k4='5OHqWxkyfLswSLHpC1K/w2y'
		
		AWS.config.update({
		  region: 'eu-west-2',
		  endpoint: 'https://dynamodb.eu-west-2.amazonaws.com',
		  accessKeyId: k1 + k2,
		  secretAccessKey: k3 + k4
		});
			
		prog.docClient = new AWS.DynamoDB.DocumentClient();



		if (local_uid === 'dng') {
			this.load_data_dng();			
			return;
		}

		
		if (local_uid === 'brik') {
			this.load_data_brik();			
			return;			
		}
		
		this.not_auth();
		
		
		
	},
	
	not_auth : function() {
		
		document.body.innerHTML = 'неправильный логин'
		
	},

	load_data_dng : function()	{   

		var start_ts=Math.floor(Date.now() / 1000)-40*86400;
		
		document.getElementById('sf0').style.display = 'none';
		document.getElementById('sf1').style.display = 'none';
		document.getElementById('alliance').style.display = 'none';
		document.getElementById('zarya').style.display = 'none';
		//document.getElementById('sf3').style.display = 'none';
		//docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",	
		//ProjectionExpression: "t_stamp, PERIOD, p_1, p_2, p_3, p_4",	ExpressionAttributeValues: { ":m_key": "AGRS_1",":ts":start_ts}}, function(err,data){render_sf_chart(data,"sf0","Добыча ПНГ на АГРС Махачкала")});	
		
		//docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		//ProjectionExpression: "t_stamp, PERIOD, p_1, p_2, p_3, p_4",	ExpressionAttributeValues: { ":m_key": "AGRS_2",":ts":start_ts}}, function(err,data){render_sf_chart(data,"sf1","Добыча ПГ на АГРС Махачкала")});	
		
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, PERIOD, p_1, p_2, p_3, p_4",	ExpressionAttributeValues: { ":m_key": "GU_4",":ts":start_ts}}, function(err,data){prog.render_sf_chart(data,"sf2","Добыча ПГ на ГУ-4")});	
		
		//prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		//ProjectionExpression: "t_stamp, PERIOD, p_1, p_2, p_3, p_4",	ExpressionAttributeValues: { ":m_key": "KARANAY",":ts":start_ts}}, function(err,data){prog.render_sf_chart(data,"sf3","Добыча ПГ на Каранай-Аул")});	
			
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3, p_4",	ExpressionAttributeValues: { ":m_key": "BRICKS",":ts":start_ts}}, function(err,data){prog.render_kirp_chart(data,"bricks","Потребление газа (завод Брикс)")});
			
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3, p_4",	ExpressionAttributeValues: { ":m_key": "ASFALT",":ts":start_ts}}, function(err,data){prog.render_kirp_chart(data,"asfalt","Потребление газа (асфальтовый завод)")});
			
		//prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		//ProjectionExpression: "t_stamp, p_1, p_2, p_3",	ExpressionAttributeValues: { ":m_key": "ALLIANCE",":ts":start_ts}}, function(err,data){render_kirp_chart(data,"alliance","Потребление газа (завод Альянс)")});
			
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3, p_4",	ExpressionAttributeValues: { ":m_key": "SABUR",":ts":start_ts}}, function(err,data){prog.render_kirp_chart(data,"sabur","Потребление газа (завод Сабур)")});	
		
		//prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		//ProjectionExpression: "t_stamp, p_1, p_2, p_3",	ExpressionAttributeValues: { ":m_key": "ZARYA",":ts":start_ts}}, function(err,data){render_kirp_chart(data,"zarya","Потребление газа (завод Заря)")});	
		
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3",	ExpressionAttributeValues: { ":m_key": "KASP",":ts":start_ts}}, function(err,data){prog.render_kirp_chart(data,"kasp","Потребление газа (Каспий Тепло Сервис)")});		
			
		/*prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1",	ExpressionAttributeValues: { ":m_key": "IZB_RES_2",":ts":start_ts}}, function(err,data){render_bars_chart(data,"res0","РП Избербаш (Резервуар №2)")});
		

		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3",	ExpressionAttributeValues: { ":m_key": "RES_1",":ts":start_ts}	}, get_res_1);	
		
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3",	ExpressionAttributeValues: { ":m_key": "RES_4",":ts":start_ts}}, get_res_4);
		
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3",	ExpressionAttributeValues: { ":m_key": "RES_3",":ts":start_ts}	}, get_res_3);	
		
		docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3",	ExpressionAttributeValues: { ":m_key": "RES_5",":ts":start_ts}}, get_res_5);	
		
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1",	ExpressionAttributeValues: { ":m_key": "MIG_1",":ts":start_ts}}, get_mig);	
		
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1",	ExpressionAttributeValues: { ":m_key": "IZB_RES_2",":ts":start_ts}}, get_bars);	*/
		

	},

	load_data_brik : function()	{   

		var start_ts=Math.floor(Date.now() / 1000)-40*86400;
		
		document.getElementById('sf0').style.display = 'none';
		document.getElementById('sf1').style.display = 'none';
		document.getElementById('sf2').style.display = 'none';
		document.getElementById('sf3').style.display = 'none';
		document.getElementById('alliance').style.display = 'none';
		document.getElementById('zarya').style.display = 'none';
		document.getElementById('sabur').style.display = 'none';
		document.getElementById('kasp').style.display = 'none';
		document.getElementById('asfalt').style.display = 'none';
		
		prog.docClient.query({TableName: "dng7",	KeyConditionExpression: "m_key = :m_key and t_stamp>=:ts",
		ProjectionExpression: "t_stamp, p_1, p_2, p_3",	ExpressionAttributeValues: { ":m_key": "BRICKS",":ts":start_ts}}, function(err,data){prog.render_kirp_chart(data,"bricks","Потребление газа (завод Брикс)")});

	},

	render_sf_chart : function(data, chart_name, m_title) {
		data=data.Items
		var data_m = data.filter(data => data.PERIOD == "M");
		var data_h = data.filter(data => data.PERIOD == "D");
		data=0;
		
		var xv=[], q=[], v=[], t=[], p=[], vt=[];
		for (var i=0; i< data_m.length;i++)
		{
			xv.push(prog.timeConverter(data_m[i].t_stamp));
			p.push(data_m[i].p_1);
			t.push(data_m[i].p_2);
			v.push(data_m[i].p_3);
			vt.push(data_m[i].p_4);
		}
		
		//вычисляем мгновенный дебит
		var xv2=[]
		for (var i=2; i< data_m.length;i+=1)
		{
			var dif_v=data_m[i].p_3-data_m[i-2].p_3;
			if (dif_v>0)
			{			
			xv2.push(prog.timeConverter(data_m[i].t_stamp));
			var q_est=3600*(dif_v)/(data_m[i].t_stamp-data_m[i-2].t_stamp);
			q.push(q_est);			
			}
		}

		var plot_data=[
			{x:xv,y:v, name: '__V, m3 __',fillcolor: 'rgba(150, 150, 50,0.5)',yaxis: 'y2', stackgroup: 'one',line: { color: 'rgb(150, 150, 150)'}},   		
			{x:xv,y:p, name: '__P, kPa__',fillcolor: 'rgba(150, 150, 50,0.5)',visible:'legendonly',line: { color: 'rgb(150, 150, 50)'}},
			{x:xv,y:t, name: '__T, C____',fillcolor: 'rgba(150, 150, 50,0.5)',visible:'legendonly',line: { color: 'rgb(50, 150, 50)'}},  	
			{x:xv,y:vt, name: '__Vt, m3__',fillcolor: 'rgba(150, 150, 50,0.5)',visible:'legendonly',line: { color: 'rgb(50, 150, 150)'}},  	
			{x:xv2,y:q, name:'__Q, m3/h_',fillcolor: 'rgba(150, 150, 50,0.5)',line: { color: 'rgb(150, 50, 50)'}},               
			
			
			
		];		
				
		var layout = {
			title: m_title,
			responsive: true,
			autorange: true,
			yaxis: {	overlaying: 'y2',side: 'left',hoverformat: '.0f'},
			yaxis2: {	side: 'right',	showgrid: false,ticks: '',	showticklabels: false,hoverformat: '.0f' },

			xaxis: {
			autorange: true,
			rangeselector: {buttons: [			

			{
			count: 1,
			label: '1h',
			step: 'hour',
			stepmode: 'backward',
			active: true
			},
			{
			  count: 1,
			  label: '1d',
			  step: 'day',
			  stepmode: 'backward',
			  active: true
			},
			{
			  count: 3,
			  label: '3d',
			  step: 'day',
			  stepmode: 'backward'
			},
			{step: 'all'}
			]},
			type: 'date'
			},
		  
		};
				
		Plotly.newPlot(chart_name+"_up",plot_data,layout, {responsive: true}); 	
			
		//Отображаем дневные данные
		var xv=[], v=[];
		for (var i=0; i< data_h.length;i++)
		{
			xv.push(prog.timeConverter(data_h[i].t_stamp));
			v.push(data_h[i].p_1);
		}
		
		var layout2 = {
			title: m_title,
			responsive: true,
			autorange: true,
			showlegend: true,
			yaxis: {hoverformat: '.0f'},
			xaxis: {autorange: true	}		
		}
		
		var plot_data2=[
			{x:xv,y:v, name: '__V, m3 __',fillcolor: 'rgba(150, 150, 50,0.5)',type: "bar",line: { color: 'rgb(150, 150, 50)'}},
		];	
		Plotly.newPlot(chart_name+"_dw",plot_data2,layout2);  	
		
	},

	render_res_chart : function(data, chart_name, m_title) {
		data=data.Items
		
		var xv=[], o=[], e=[], w=[];
		for (var i=0; i< data.length;i++)
		{
			xv.push(prog.timeConverter(data[i].t_stamp));
			o.push(Math.max(data[i].p_1,0));
			e.push(Math.max(data[i].p_2,0));
			w.push(Math.max(data[i].p_3,0));
		}
		
		var plot_data=[
		
			{x:xv,y:w, name: '___вода___',fillcolor: 'rgba(50, 50, 50,0.5)', stackgroup: 'one',line: { color: 'rgb(150, 150, 50)'}},
			{x:xv,y:e, name: '__эмульс._',fillcolor: 'rgba(100, 100, 100,0.5)', stackgroup: 'one',line: { color: 'rgb(50, 150, 50)'}},  
			{x:xv,y:o, name: '___нефть__',fillcolor: 'rgba(150, 150, 50,0.5)', stackgroup: 'one',line: { color: 'rgb(150, 150, 150)'}},   				
		];		
				
		var layout = {
			title: m_title,
			responsive: true,
			autorange: true,
		  
			xaxis: {
			autorange: true,
			rangeselector: {buttons: [	
			{
			count: 1,
			label: '1h',
			step: 'hour',
			stepmode: 'backward',
			active: true
			},
			{
			count: 1,
			label: '1d',
			step: 'day',
			stepmode: 'backward',
			active: true
			},
			{
			count: 3,
			label: '3d',
			step: 'day',
			stepmode: 'backward'
			},
			{step: 'all'}
			]},
			type: 'date'
			},
		  
		};
				
		Plotly.newPlot(chart_name,plot_data,layout, {responsive: true}); 	
	},
	
	render_kirp_chart : function(data, chart_name, m_title) {
	
		data=data.Items

		var xv=[], v=[],t=[],p=[], vr=[];
		var start_ts_h=Math.floor(Date.now() / 1000)-3*86400;
		for (var i=1; i< data.length;i++)
		{
			if (data[i].t_stamp>start_ts_h) {
				xv.push(prog.timeConverter(data[i].t_stamp));
				let time_diff = data[i].t_stamp - data[i-1].t_stamp;
				
				let day_v=Math.round(data[i].p_1-data[i-1].p_1);
				let day_vr=Math.round(data[i].p_4-data[i-1].p_4);
				if (day_v<0 || time_diff!==3600)
					day_v=null
				v.push(day_v);
				t.push(data[i].p_3);
				p.push(data[i].p_2);
				vr.push(day_vr);
			}
		}
		
		
		var plot_data=[
		
			{x:xv,y:v, name: '__V, м3__',mode: 'lines+markers', type: 'scatter',fillcolor: 'rgba(50, 50, 50,0.5)'},
			{x:xv,y:t, name: '__T, C___',mode: 'lines+markers', type: 'scatter',fillcolor: 'rgba(50, 50, 50,0.5)'},
			{x:xv,y:p, name: '__P, Атм_',mode: 'lines+markers', type: 'scatter',fillcolor: 'rgba(50, 50, 50,0.5)'},
			{x:xv,y:vr, name: '__Vр, м3_',mode: 'lines+markers', type: 'scatter',fillcolor: 'rgba(50, 50, 50,0.5)', visible : 'legendonly'}
		];		
				
		var layout = {
		  title: m_title,
		  responsive: true,
		  autorange: true,
		  showlegend: true
		};
				
		Plotly.newPlot(chart_name+"_up",plot_data,layout, {responsive: true}); 	





		var start_ts_d=Math.floor(Date.now() / 1000)-8*86400;
		var tableRef = document.getElementById(chart_name+'_table');		
		row_cnt=1
		prv_v=0
		for (let i=0;i<data.length;i++) {	
			
			if (data[i].t_stamp>start_ts_d) {
				
				var newRow = tableRef.insertRow(row_cnt);
				let dt=new Date(data[i].t_stamp*1000);
				if (dt.getHours()===10) {			
					newRow.insertCell(0).appendChild(document.createTextNode(dt.toLocaleString()));
					newRow.insertCell(1).appendChild(document.createTextNode(Math.round(data[i].p_1)));
					
					if (prv_v===0)
						newRow.insertCell(2).appendChild(document.createTextNode("-"));			
					else
						newRow.insertCell(2).appendChild(document.createTextNode(Math.round(data[i].p_1-prv_v)));
					
					newRow.insertCell(3).appendChild(document.createTextNode(data[i].p_2));
					newRow.insertCell(4).appendChild(document.createTextNode(data[i].p_3));
					prv_v=data[i].p_1
					row_cnt++;				
				}		        
				
			}

		}
	
	},	
	
	render_mig_chart : function(data, chart_name, m_title) {
		data=data.Items
		
		var xv=[], v=[];
		for (var i=0; i< data.length;i++)
		{
			xv.push(prog.timeConverter(data[i].t_stamp));
			v.push(data[i].p_1);

		}
		
		var plot_data=[
		
			{x:xv,y:v, name: '___V, м3___',fillcolor: 'rgba(50, 50, 50,0.5)', line: { color: 'rgb(150, 150, 50)'}},
				
		];		
				
		var layout = {
		  title: m_title,
		  responsive: true,
		  autorange: true,
		  showlegend: true
		};
				
		Plotly.newPlot(chart_name,plot_data,layout, {responsive: true}); 	
	},
		
	render_bars_chart : function(data, chart_name, m_title){
		data=data.Items
		
		var xv=[], v=[];
		for (var i=0; i< data.length;i++)
		{
			xv.push(prog.timeConverter(data[i].t_stamp));
			
			v.push((641-data[i].p_1)*0.175);

		}
		
		var plot_data=[
		
			{x:xv,y:v, name: '___V, м3___',fillcolor: 'rgba(50, 50, 50,0.5)',stackgroup: 'one', line: { color: 'rgb(255, 0, 0)'}},
				
		];		
				
		var layout = {
		  title: m_title,
		  responsive: true,
		  autorange: true,
		  showlegend: true
		};
				
		Plotly.newPlot(chart_name,plot_data,layout, {responsive: true}); 	
	},

	timeConverter : function(UNIX_timestamp){
		var date = new Date(UNIX_timestamp * 1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		var formattedTime = hours + '-' + minutes.substr(-2) + '-' + seconds.substr(-2);
		return date;
	}
	
	
	
}


