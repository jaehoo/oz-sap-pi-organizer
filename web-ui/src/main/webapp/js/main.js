var OZ = OZ || {};

OZ.sapOrganizer = OZ.sapOrganizer || {};


OZ.sapOrganizer.refresh = function(waTable, headerId){

    
    console.info("reload ¬¬" + waTable.viewMode);

    var data = {};
    data.cols = OZ.sapOrganizer.getHeader(waTable.viewMode);
    data.rows = OZ.sapOrganizer.getBody();
    var tableData = OZ.sapOrganizer.jsonFormat(data);
    waTable.setData(tableData, false);


}

OZ.sapOrganizer.toogleTableView= function(waTable){

    console.info("set toggle button");
    document.getElementById("btnBuild").onclick= function(){

    var val=this.getAttribute("value");
    var headerId;
    //console.info("TEST:"+val);

    if(val == "min"){
        this.innerHTML='Summary';
        this.setAttribute('value','full');
        waTable.viewMode=1;
    }
    else{
        this.innerHTML='View All';
        this.setAttribute('value','min');
        waTable.viewMode=2;
    }
    
    var data =waTable.getData(false);;
    data.cols = OZ.sapOrganizer.getHeader(waTable.viewMode);
    waTable.setData(data, false);


    };

};

/**/
OZ.sapOrganizer.getSummary = function (){

    console.log("Get Summary page...");

    var data = {};
    
    data.cols = OZ.sapOrganizer.getHeader(0);
    data.rows = OZ.sapOrganizer.getBody();

    //console.info(data.cols);
    //console.info(data.rows);

    var tableData = OZ.sapOrganizer.jsonFormat(data);

    tableData.el="#dynTable";
    OZ.sapOrganizer.buildTable(tableData);

}

OZ.sapOrganizer.getDetail = function (){

    console.log("Get Detail page...");

    var data = {};
    
    data.cols = OZ.sapOrganizer.getHeader(2);
    data.rows = OZ.sapOrganizer.getBody();

    //console.info(data.cols);
    //console.info(data.rows);

    var tableData = OZ.sapOrganizer.jsonFormat(data);

    return  tableData;

}



OZ.sapOrganizer.getBody = function (){

    console.log("Get body page ...");

    var body;

    $.ajax({
        url: 'js/data.json',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        //data: priv.options.urlData,
        async: false,
        success: function (data) {
            //console.info(data);
            body=data.rows;
        },
        error: function (err) {
            console.log('request error: '.f(err));
        }
    });

    return body;

}



OZ.sapOrganizer.getHeader = function (id){

    console.debug('Getting header...');

    var header;

    $.ajax({
        url: 'js/cols.json',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: {test:"A"},
        async: false,
        success: function (data) {
            //console.info("success");
            //console.info(data);
            header=data.cols[id];
            //console.info(header);
        },
        error: function (err) {
            console.log('request error: '.f(err));
        }
    });

    return header;
}





OZ.sapOrganizer.getData = function (){

    console.log('Calling... getData');

    var priv={};

    // Get Cols

    $.ajax({
        url: 'js/cols.json',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        //data: priv.options.urlData,
        async: false,
        success: function (data) {
            priv.cols=data.cols[0];
            //console.log(priv.data);

        },
        error: function (err) {
            console.log('request error: '.f(err));
        }
    });

    $.ajax({
        url: 'js/data.json',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        //data: priv.options.urlData,
        async: false,
        success: function (data) {
            priv.data=data;
            //console.log(priv.data);

        },
        error: function (err) {
            console.log('request error: '.f(err));
        }
    });

    return OZ.sapOrganizer.jsonFormat(priv.data);



//    var url = "js/data.json";
//
//    var jqxhr =$.getJSON(url, function (json) {
//        console.log("X:"+json.cols.id.tooltip);
//        masterData= json;
//
//        //OZ.sapOrganizer.buildTable(masterData);
//    }) .done(function() {
//
//            console.log( "second success" );
//            console.log("num rows:"+masterData.rows.length);
//            //this.result=OZ.sapOrganizer.jsonFormat(this.result);
//            //OZ.sapOrganizer.buildTable(masterData);
//
//        })
//        .fail(function( jqxhr, textStatus, error ){
//            var err = textStatus + ", " + error;
//            console.log( "Request Failed: " + err );
//        })
//        .always(function() {
//            console.log( "complete" );
//        });
//
//    console.log("final num rows:"+masterData.rows.length);



}


/*
Convert json data to legible format
*/
OZ.sapOrganizer.jsonFormat = function(json){
    console.log("Format json data");


    var data = {};

    data.cols = json.cols;
    data.rows = [];

    var rows = json.rows;
    var row;
    var e;

    //console.info("format:");
    //console.info(rows);

    for(var i in rows ) {
        row= rows[i];
        e={};

        e.id= row.meta.id;
        e.important = i;
        //e.checkable = true;
        e.showDetail = i;
        e.aris= row.meta.aris;
        e.track= row.meta.track;
        e.mode= row.metadata.esr.sender.type;
        e.sysSender = row.meta.sender.sysName;
        e.sysReceiver = row.meta.receiver.sysName;


        e.adapSender = row.metadata.ib.adapterSender;
        e.adapReceiver = row.metadata.ib.adapterReceiver;

        e.senderContact = row.meta.sender.owner;
        e.receiverContact = row.meta.receiver.owner;

        e.bsSender = row.metadata.esr.sender.bs;
        e.bsReceiver = row.metadata.esr.receiver.bs;

        e.scenarioID = row.metadata.ib.scenario;

        e.swcSender = row.metadata.esr.sender.swc;
        e.swcReceiver = row.metadata.esr.receiver.swc;

        e.nsSender = row.metadata.esr.sender.namespace;
        e.nsReciver = row.metadata.esr.receiver.namespace;

        e.siSender = row.metadata.esr.sender.siname;
        e.siReceiver = row.metadata.esr.receiver.siname;

        e.ccSender = row.metadata.ib.ccsender;
        e.ccReceiver = row.metadata.ib.ccreceiver;

        e.fsOwner = row.meta.fs;
        e.tsOwner = row.meta.ts;


        data.rows.push(e);

    }

    return data;

}

OZ.sapOrganizer.createDetailBox = function(data){

    //console.info('#elDetail'+data.row.id);
    var item = data.row;

    var nBox = $('<article>', { id: "elDetail"+item.id , class: 'detailScenario boxHolder newBox'});
    var rigthItemMenu = $('<ul class="itemMenu"></ul>');


    var opClose = $('<li>');
    var opPlus = $('<li>');

    var iclose = $('<a class="micons ico-close"></a>');
    var icoPlus = $('<a class="micons ico-plus"></a>');

    opClose.append(iclose);
    opPlus.append(icoPlus);


    rigthItemMenu.append(opClose);
    rigthItemMenu.append(opPlus);

    var detailBox = $('<div class="dtHolder"></div>');

    var titleItem = $('<div>', { class: 'itemHead' });
        titleItem.append( rigthItemMenu );
        titleItem.append('<span>'+item.track+'</span>'+'<div class="lblid"><a>'+item.aris+'</a>'+'</div>');
        //+'<ul class="itemMenuv"><li><a class="micons ico-plus"></a></li></ul>'
        
    
    // console.info(data);
    
    var entries = {

        sender:{
            title:'Sender',
            attr:{ class:'dsnd'},
            values:{
                "System": item.sysSender,
                "BS": item.bsSender,
                "SWC": item.swcSender,
                "Namespace": item.nsSender,
                "SIName":item.siSender,
                'Type':item.mode,
                'Apdater': item.adapSender,
                'CC':item.ccSender
            }
        },
        pi:{
            title:'PI',
            attr:{ class:'dpi'},
            values:{
                'Scenario':item.scenarioID,
                'Mapping':''
            }
        },
        receiver:{
            title:'Receiver',
            attr:{ class:'drcv'},
            values:{
                'System':item.sysSender,
                'BS': item.bsReceiver,
                'SWC': item.swcReceiver,
                'Namespace': item.nsReciver,
                'SIName': item.siReceiver,
                'Type': item.mode,
                'Apdater': item.adapReceiver,
                'CC': item.ccReceiver
            }
        }
    };

    function addItems(entries){

        for( i in entries ){

            var item = $('<div>', entries[i].attr);
            item.append('<h3>'+ entries[i].title +'</h3>');

            $.each(entries[i].values, function(key, value){
                //console.log(key, value);
                if(value.length!=0){
                    item.append('<p><strong>'+key+'</strong><label>'+value+'</label></p>');    
                }
                    
                });    

            detailBox.append(item);
        }
    }

    
    nBox.append( titleItem );
    nBox.append( detailBox );
    addItems( entries );
    
    // Events
    iclose.on('click',function(e){
        nBox.slideAndFadeToggleB();
        e.stopPropagation();

    });

    icoPlus.on('click', function(e){
        detailBox.fadeThenSlideToggle(250);
        e.stopPropagation();
    });



    return nBox;

}


OZ.sapOrganizer.buildTable= function(data){
    //console.log("=============");

    var el= $(data.el);

    //console.log("build table"+data.cols.id.index);

    //An example with all options.
    var waTable = el.WATable({
        pageSize: 10,                //Sets the initial pagesize
        filter: true,               //Show filter fields
        columnPicker: false,         //Show the columnPicker button
        pageSizes: [5,10,20,50,100,200,500],  //Set custom pageSizes. Leave empty array to hide button.
        hidePagerOnEmpty: true,     //Removes the pager if data is empty.
        checkboxes: false,           //Make rows checkable. (Note. You need a column with the 'unique' property)
        preFill: true,              //Initially fills the table with empty rows (as many as the pagesize).
        //url: 'js/data.json',    //Url to a webservice if not setting data manually as we do in this example
        //urlData: { report:1 }     //Any data you need to pass to the webservice
        //urlPost: true             //Use POST httpmethod to webservice. Default is GET.
        viewMode:1,                 // 1 Summary, 2 Full
        types: {                    //Following are some specific properties related to the data types
            string: {
                //filterTooltip: "Giggedi..."    //What to say in tooltip when hoovering filter fields. Set false to remove.
                //placeHolder: "Type here..."    //What to say in placeholder filter fields. Set false for empty.
            },
            number: {
                decimals: 1   //Sets decimal precision for float types
            },
            bool: {
                //filterTooltip: false
            },
            date: {
                utc: true,            //Show time as universal time, ie without timezones.
                //format: 'yy/dd/MM',   //The format. See all possible formats here http://arshaw.com/xdate/#Formatting.
                datePicker: true      //Requires "Datepicker for Bootstrap" plugin (http://www.eyecon.ro/bootstrap-datepicker).
            }
        },
        actions: {                //This generates a button where you can add elements.
            filter: true,         //If true, the filter fields can be toggled visible and hidden.
            columnPicker: true,   //if true, the columnPicker can be toggled visible and hidden.
            custom: [             //Add any other elements here. Here is a refresh and export example.
            $('<a href="#" class="refresh"><i class="icon-refresh"></i>&nbsp;Refresh</a>'),
            $('<a href="#" class="export_all"><i class="icon-share"></i>&nbsp;Export all rows</a>'),
            $('<a href="#" class="export_checked"><i class="icon-share"></i>&nbsp;Export checked rows</a>'),
            $('<a href="#" class="export_filtered"><i class="icon-share"></i>&nbsp;Export filtered rows</a>')
            ]
        },
        tableCreated: function(data) {    //Fires when the table is created / recreated. Use it if you want to manipulate the table in any way.
            console.log('table created'); //data.table holds the html table element.
            //console.log(data);            //'this' keyword also holds the html table element.
        },
        rowClicked: function(data) {      //Fires when a row is clicked (Note. You need a column with the 'unique' property).
            //console.log('row clicked');   //data.event holds the original jQuery event.
            //console.log(data.row.id);            //data.row holds the underlying row you supplied.
            //data.column holds the underlying column you supplied.
            //data.checked is true if row is checked.
            //'this' keyword holds the clicked element.

            //data.event holds the original jQuery event
            
            //console.info(data);
            //console.info(data.column.column);

            if(data.column.column == 'showDetail'){
                // change color checked row
                //console.info("colorize");

                //var abc= $(this);

                //abc.addClass('beto');
                //debugger;
                
                //console.info(data.checked);
                detailBox=$('#elDetail'+data.row.id);
                //console.info('exists: '+detailBox.exists() +'Is Hidden:'+detailBox.is(":hidden"));
                
                if(detailBox.exists()){
                    data.event.preventDefault();
                    return ;
                }
                else{

                    var detailBox= OZ.sapOrganizer.createDetailBox(data);
                    OZ.sapOrganizer.selDetBox(detailBox);


                    $(".popcontainer").prepend(detailBox);
                    detailBox.fadeThenSlideToggle(500);
                }

            }
            else{


            }

            

        },
        columnClicked: function(data) {    //Fires when a column is clicked
            console.log('column clicked');  //data.event holds the original jQuery event
            console.log(data);              //data.column holds the underlying column you supplied
            //data.descending is true when sorted descending (duh)
        },
        pageChanged: function(data) {      //Fires when manually changing page
            console.log('page changed');    //data.event holds the original jQuery event
            console.log(data);              //data.page holds the new page index
        },
        pageSizeChanged: function(data) {  //Fires when manually changing pagesize
            console.log('pagesize changed');//data.event holds teh original event
            console.log(data);              //data.pageSize holds the new pagesize
        }
    }).data('WATable');  //This step reaches into the html data property to get the actual WATable object. Important if you want a reference to it as we want here.

    //Generate some data
    //var data = this.getData();
    waTable.setData(data);  //Sets the data.
    //waTable.setData(data, true); //Sets the data but prevents any previously set columns from being overwritten
    //waTable.setData(data, false, false); //Sets the data and prevents any previously checked rows from being reset

    var allRows = waTable.getData(false); //Gets the data you previously set.
    var checkedRows = waTable.getData(true); //Gets the data you previously set, but with checked rows only.
    var filteredRows = waTable.getData(false, true); //Gets the data you previously set, but with filtered rows only.

    var pageSize = waTable.option("pageSize"); //Get option
    //waTable.option("pageSize", pageSize); //Set option

    //Example event handler triggered by the custom refresh link above.
    $('body').on('click', '.refresh', function(e) {

        e.preventDefault();
        OZ.sapOrganizer.refresh(waTable);

        /**var data ={};
        data.cols = OZ.sapOrganizer.getHeader(1);
        data.rows = OZ.sapOrganizer.getBody();
        var ndata  = OZ.sapOrganizer.jsonFormat(data);

        //var data = waTable.getData();
        waTable.setData(ndata, false);**/



    });
    //Example event handler triggered by the custom export links above.
    $('body').on('click', '.export_checked, .export_filtered, .export_all', function(e) {
        e.preventDefault();
        var elem = $(e.target);
        var data;
        if (elem.hasClass('export_all')) data = waTable.getData(false);
        else if (elem.hasClass('export_checked')) data = waTable.getData(true);
        else if (elem.hasClass('export_filtered')) data = waTable.getData(false, true);
        console.log(data.rows.length + ' rows returned');
        console.log(data);
        alert(data.rows.length + ' rows returned.\nSee console for details.');
    });


    OZ.sapOrganizer.toogleTableView(waTable);   


}

OZ.sapOrganizer.getSampleData1 = function() {

    var data = {
        cols: {
            id: {
                index: 1,
                friendly: "ID / RICEF",
                type: "String"
            },
            track: {
                index: 2,
                friendly: "Track",
                type: "string"
            },
            interfaceType: {
                index: 3,
                friendly: "Sync / Async",
                type: "string"
            }
        },
        rows: [
        {
            userId: 1,
            interfaceType: "Async",
            track: "Mercaderias"
        },
        {
            userId: 2,
            interfaceType: "Sync",
            track: {a:'aw', b:'aaaa'}
                //track: "Mercaderias"
            }
            ]
        }


        return data;

    }




    OZ.sapOrganizer.getSampleData = function() {

    //First define the columns
    var cols = {
        userId: {
            index: 1, //The order this column should appear in the table
            type: "number", //The type. Possible are string, number, bool, date(in milliseconds).
            friendly: "<i class='icon-user'></i>",  //Name that will be used in header. Can also be any html as shown here.
            format: "<a href='#' class='userId' target='_blank'>{0}</a>",  //Used to format the data anything you want. Use {0} as placeholder for the actual data.
            unique: true,  //This is required if you want checkable rows, or to use the rowClicked callback. Be certain the values are really unique or weird things will happen.
            sortOrder: "asc", //Data will initially be sorted by this column. Possible are "asc" or "desc"
            tooltip: "This column has an initial filter", //Show some additional info about column
            filter: "1..400" //Set initial filter.
        },
        name: {
            index: 2,
            type: "string",
            friendly: "Name",
            tooltip: "This column has a custom placeholder", //Show some additional info about column
            placeHolder: "abc123" //Overrides default placeholder and placeholder specified in data types(row 34).
        },
        age: {
            index: 3,
            type: "number",
            friendly: "Age",
            tooltip: "This column has filtering turned off", //Show some additional info about column
            filter: false //Removes filter field for this column
        },
        weight: {
            index: 4,
            type: "number",
            decimals: 2, //Force decimal precision
            friendly: "Weight",
            placeHolder: "50..90",
            tooltip: "This column has no tooltip for the filter", //Show some additional info about column
            filterTooltip: false //Turn off tooltip for this column
        },
        height: {
            type: "number",
            friendly: "Height(cm)",
            hidden:true //Hides the column. Useful if you want this value later on but no visible to user. It's available to be visible if columnPicker is enabled.
        },
        important: {
            index: 5,
            type: "bool",
            friendly: "Important"
        },
        someDate: {
            index: 6,
            type: "date", //Don't forget dates are expressed in milliseconds
            friendly: "SomeDate"
        }
    };

    /*
     Create the actual data.
     Whats worth mentioning is that you can use a 'format' property just as in the column definition,
     but on a row level. See below on how we create a weightFormat property. This will be used when rendering the weight column.
     Also, you can pre-check rows with the 'checked' property and prevent rows from being checkable with the 'checkable' property.
     */
     var rows = [];
     var i = 1;
     while(i <= 500)
     {
        var weight = (Math.floor(Math.random()*40)+50) + (Math.floor(Math.random()*100)/100);
        var weightClass = weight <70 ? 'green' : weight <80 && weight >=70 ? 'yellow' : 'red';

        //We leave some fields intentionally undefined, so you can see how sorting/filtering works with these.
        var doc = {
            userId: i,
            name: i%100 == 0 ? undefined : elfName(),
            age: Math.floor(Math.random()*50)+20,
            weight: weight > 50 && weight < 60 ? undefined:weight,
            weightFormat:  "<div class='" + weightClass + "'>{0}</div>",
            height: Math.floor(Math.random()*50)+150,
            important: i%3 == 0 ? undefined : i%4 == 0,
            someDate: i%4 == 0
            ? undefined
            : Date.now() + (i*Math.floor(Math.random()*(60*60*24*100))),
            checkable: i % 4 != 0,
            checked: i % 3 == 0
        };
        rows.push(doc);
        i++;
    }

    //Create the returning object. Besides cols and rows, you can also pass any other object you would need later on.
    var data = {
        cols: cols,
        rows: rows,
        otherStuff: {
            thatIMight: 1,
            needLater: true
        }

    };

    return data;
}



//Helper function to generate names
function elfName() {
    var elf_male = new Array("Abardon", "Acaman", "Achard", "Ackmard", "Agon", "Agnar", "Abdun", "Aidan", "Airis", "Aldaren", "Alderman", "Alkirk", "Amerdan", "Anfarc", "Aslan", "Actar", "Atgur", "Atlin", "Aldan", "Badek", "Baduk", "Bedic", "Beeron", "Bein", "Bithon", "Bohl", "Boldel", "Bolrock", "Bredin", "Bredock", "Breen", "tristan", "Bydern", "Cainon", "Calden", "Camon", "Cardon", "Casdon", "Celthric", "Cevelt", "Chamon", "Chidak", "Cibrock", "Cipyar", "Colthan", "Connell", "Cordale", "Cos", "Cyton", "Daburn", "Dawood", "Dak", "Dakamon", "Darkboon", "Dark", "Darg", "Darmor", "Darpick", "Dask", "Deathmar", "Derik", "Dismer", "Dokohan", "Doran", "Dorn", "Dosman", "Draghone", "Drit", "Driz", "Drophar", "Durmark", "Dusaro", "Eckard", "Efar", "Egmardern", "Elvar", "Elmut", "Eli", "Elik", "Elson", "Elthin", "Elbane", "Eldor", "Elidin", "Eloon", "Enro", "Erik", "Erim", "Eritai", "Escariet", "Espardo", "Etar", "Eldar", "Elthen", "Elfdorn", "Etran", "Eythil", "Fearlock", "Fenrirr", "Fildon", "Firdorn", "Florian", "Folmer", "Fronar", "Fydar", "Gai", "Galin", "Galiron", "Gametris", "Gauthus", "Gehardt", "Gemedes", "Gefirr", "Gibolt", "Geth", "Gom", "Gosform", "Gothar", "Gothor", "Greste", "Grim", "Gryni", "Gundir", "Gustov", "Halmar", "Haston", "Hectar", "Hecton", "Helmon", "Hermedes", "Hezaq", "Hildar", "Idon", "Ieli", "Ipdorn", "Ibfist", "Iroldak", "Ixen", "Ixil", "Izic", "Jamik", "Jethol", "Jihb", "Jibar", "Jhin", "Julthor", "Justahl", "Kafar", "Kaldar", "Kelar", "Keran", "Kib", "Kilden", "Kilbas", "Kildar", "Kimdar", "Kilder", "Koldof", "Kylrad", "Lackus", "Lacspor", "Lahorn", "Laracal", "Ledal", "Leith", "Lalfar", "Lerin", "Letor", "Lidorn", "Lich", "Loban", "Lox", "Ludok", "Ladok", "Lupin", "Lurd", "Mardin", "Markard", "Merklin", "Mathar", "Meldin", "Merdon", "Meridan", "Mezo", "Migorn", "Milen", "Mitar", "Modric", "Modum", "Madon", "Mafur", "Mujardin", "Mylo", "Mythik", "Nalfar", "Nadorn", "Naphazw", "Neowald", "Nildale", "Nizel", "Nilex", "Niktohal", "Niro", "Nothar", "Nathon", "Nadale", "Nythil", "Ozhar", "Oceloth", "Odeir", "Ohmar", "Orin", "Oxpar", "Othelen", "Padan", "Palid", "Palpur", "Peitar", "Pendus", "Penduhl", "Pildoor", "Puthor", "Phar", "Phalloz", "Qidan", "Quid", "Qupar", "Randar", "Raydan", "Reaper", "Relboron", "Riandur", "Rikar", "Rismak", "Riss", "Ritic", "Ryodan", "Rysdan", "Rythen", "Rythorn", "Sabalz", "Sadaron", "Safize", "Samon", "Samot", "Secor", "Sedar", "Senic", "Santhil", "Sermak", "Seryth", "Seth", "Shane", "Shard", "Shardo", "Shillen", "Silco", "Sildo", "Silpal", "Sithik", "Soderman", "Sothale", "Staph", "Suktar", "zuth", "Sutlin", "Syr", "Syth", "Sythril", "Talberon", "Telpur", "Temil", "Tamilfist", "Tempist", "Teslanar", "Tespan", "Tesio", "Thiltran", "Tholan", "Tibers", "Tibolt", "Thol", "Tildor", "Tilthan", "Tobaz", "Todal", "Tothale", "Touck", "Tok", "Tuscan", "Tusdar", "Tyden", "Uerthe", "Uhmar", "Uhrd", "Updar", "Uther", "Vacon", "Valker", "Valyn", "Vectomon", "Veldar", "Velpar", "Vethelot", "Vildher", "Vigoth", "Vilan", "Vildar", "Vi", "Vinkol", "Virdo", "Voltain", "Wanar", "Wekmar", "Weshin", "Witfar", "Wrathran", "Waytel", "Wathmon", "Wider", "Wyeth", "Xandar", "Xavor", "Xenil", "Xelx", "Xithyl", "Yerpal", "Yesirn", "Ylzik", "Zak", "Zek", "Zerin", "Zestor", "Zidar", "Zigmal", "Zilex", "Zilz", "Zio", "Zotar", "Zutar", "Zytan");
    var elf_female = new Array("Acele Acholate", "Ada", "Adiannon", "Adorra", "Ahanna", "Akara", "Akassa", "Akia", "Amara", "Amarisa", "Amarizi", "Ana", "Andonna", "Ariannona", "Arina", "Arryn", "Asada", "Awnia", "Ayne", "Basete", "Bathelie", "Bethel", "Brana", "Brynhilde", "Calene", "Calina", "Celestine", "Corda", "Enaldie", "Enoka", "Enoona", "Errinaya", "Fayne", "Frederika", "Frida", "Gvene", "Gwethana", "Helenia", "Hildandi", "Helvetica", "Idona", "Irina", "Irene", "Illia", "Irona", "Justalyne", "Kassina", "Kilia", "Kressara", "Laela", "Laenaya", "Lelani", "Luna", "Linyah", "Lyna", "Lynessa", "Mehande", "Melisande", "Midiga", "Mirayam", "Mylene", "Naria", "Narisa", "Nelena", "Nimaya", "Nymia", "Ochala", "Olivia", "Onathe", "Parthinia", "Philadona", "Prisane", "Rhyna", "Rivatha", "Ryiah", "Sanata", "Sathe", "Senira", "Sennetta", "Serane", "Sevestra", "Sidara", "Sidathe", "Sina", "Sunete", "Synestra", "Sythini", "zena", "Tabithi", "Tomara", "Teressa", "Tonica", "Thea", "Teressa", "Urda", "Usara", "Useli", "Unessa", "ursula", "Venessa", "Wanera", "Wellisa", "yeta", "Ysane", "Yve", "Yviene", "Zana", "Zathe", "Zecele", "Zenobe", "Zema", "Zestia", "Zilka", "Zoucka", "Zona", "Zyneste", "Zynoa");
    var elf_surname = new Array("Abardon", "Acaman", "Achard", "Ackmard", "Agon", "Agnar", "Aldan", "Abdun", "Aidan", "Airis", "Aldaren", "Alderman", "Alkirk", "Amerdan", "Anfarc", "Aslan", "Actar", "Atgur", "Atlin", "Badek", "Baduk", "Bedic", "Beeron", "Bein", "Bithon", "Bohl", "Boldel", "Bolrock", "Bredin", "Bredock", "Breen", "tristan", "Bydern", "Cainon", "Calden", "Camon", "Cardon", "Casdon", "Celthric", "Cevelt", "Chamon", "Chidak", "Cibrock", "Cipyar", "Colthan", "Connell", "Cordale", "Cos", "Cyton", "Daburn", "Dawood", "Dak", "Dakamon", "Darkboon", "Dark", "Dark", "Darmor", "Darpick", "Dask", "Deathmar", "Derik", "Dismer", "Dokohan", "Doran", "Dorn", "Dosman", "Draghone", "Drit", "Driz", "Drophar", "Durmark", "Dusaro", "Eckard", "Efar", "Egmardern", "Elvar", "Elmut", "Eli", "Elik", "Elson", "Elthin", "Elbane", "Eldor", "Elidin", "Eloon", "Enro", "Erik", "Erim", "Eritai", "Escariet", "Espardo", "Etar", "Eldar", "Elthen", "Etran", "Eythil", "Fearlock", "Fenrirr", "Fildon", "Firdorn", "Florian", "Folmer", "Fronar", "Fydar", "Gai", "Galin", "Galiron", "Gametris", "Gauthus", "Gehardt", "Gemedes", "Gefirr", "Gibolt", "Geth", "Gom", "Gosform", "Gothar", "Gothor", "Greste", "Grim", "Gryni", "Gundir", "Gustov", "Halmar", "Haston", "Hectar", "Hecton", "Helmon", "Hermedes", "Hezaq", "Hildar", "Idon", "Ieli", "Ipdorn", "Ibfist", "Iroldak", "Ixen", "Ixil", "Izic", "Jamik", "Jethol", "Jihb", "Jibar", "Jhin", "Julthor", "Justahl", "Kafar", "Kaldar", "Kelar", "Keran", "Kib", "Kilden", "Kilbas", "Kildar", "Kimdar", "Kilder", "Koldof", "Kylrad", "Lackus", "Lacspor", "Lahorn", "Laracal", "Ledal", "Leith", "Lalfar", "Lerin", "Letor", "Lidorn", "Lich", "Loban", "Lox", "Ludok", "Ladok", "Lupin", "Lurd", "Mardin", "Markard", "Merklin", "Mathar", "Meldin", "Merdon", "Meridan", "Mezo", "Migorn", "Milen", "Mitar", "Modric", "Modum", "Madon", "Mafur", "Mujardin", "Mylo", "Mythik", "Nalfar", "Nadorn", "Naphazw", "Neowald", "Nildale", "Nizel", "Nilex", "Niktohal", "Niro", "Nothar", "Nathon", "Nadale", "Nythil", "Ozhar", "Oceloth", "Odeir", "Ohmar", "Orin", "Oxpar", "Othelen", "Padan", "Palid", "Palpur", "Peitar", "Pendus", "Penduhl", "Pildoor", "Puthor", "Phar", "Phalloz", "Qidan", "Quid", "Qupar", "Randar", "Raydan", "Reaper", "Relboron", "Riandur", "Rikar", "Rismak", "Riss", "Ritic", "Ryodan", "Rysdan", "Rythen", "Rythorn", "Sabalz", "Sadaron", "Safize", "Samon", "Samot", "Secor", "Sedar", "Senic", "Santhil", "Sermak", "Seryth", "Seth", "Shane", "Shard", "Shardo", "Shillen", "Silco", "Sildo", "Silpal", "Sithik", "Soderman", "Sothale", "Staph", "Suktar", "zuth", "Sutlin", "Syr", "Syth", "Sythril", "Talberon", "Telpur", "Temil", "Tamilfist", "Tempist", "Teslanar", "Tespan", "Tesio", "Thiltran", "Tholan", "Tibers", "Tibolt", "Thol", "Tildor", "Tilthan", "Tobaz", "Todal", "Tothale", "Touck", "Tok", "Tuscan", "Tusdar", "Tyden", "Uerthe", "Uhmar", "Uhrd", "Updar", "Uther", "Vacon", "Valker", "Valyn", "Vectomon", "Veldar", "Velpar", "Vethelot", "Vildher", "Vigoth", "Vilan", "Vildar", "Vi", "Vinkol", "Virdo", "Voltain", "Wanar", "Wekmar", "Weshin", "Witfar", "Wrathran", "Waytel", "Wathmon", "Wider", "Wyeth", "Xandar", "Xavor", "Xenil", "Xelx", "Xithyl", "Yerpal", "Yesirn", "Ylzik", "Zak", "Zek", "Zerin", "Zestor", "Zidar", "Zigmal", "Zilex", "Zilz", "Zio", "Zotar", "Zutar", "Zytan");
    var prefix_male = elf_male;
    var prefix_female = elf_female;
    var suffix = elf_surname;
    var n1m = parseInt(Math.random() * prefix_male.length);
    var n1f = parseInt(Math.random() * prefix_female.length);
    var n2 = parseInt(Math.random() * suffix.length);
    var n2ekstra = parseInt(Math.random() * suffix.length);
    var extraname = "extranahme";
    var prename_male = prefix_male[n1m].slice(0, 1).toUpperCase() + prefix_male[n1m].slice(1);
    var prename_female = prefix_female[n1f].slice(0, 1).toUpperCase() + prefix_female[n1f].slice(1);
    var sufname = suffix[n2].slice(0, 1).toUpperCase() + suffix[n2].slice(1);
    var extraname = suffix[n2ekstra].slice(0, 1).toUpperCase() + suffix[n2ekstra].slice(1);
    var n3 = parseInt(Math.random() * 100);
    if (n3 <= 40) {
        name = prename_male + " " + sufname
    } else if (n3 > 40 && n3 <= 70) {
        name = prename_female + " " + sufname
    }
    return name;
}


/**
 * Orbital Tabs style script
 * @type {{}}
 */

 OZ.view = OZ.view = {};

 OZ.view.loadTabs = function(){

    console.log('========= TBAS');

    // get tab container
    var container = document.getElementById("tabContainer");
    // set current tab
    var navitem = container.querySelector(".tabs ul li");
    //store which tab we are on
    var ident = navitem.id.split("_")[1];
    navitem.parentNode.setAttribute("data-current",ident);
    //set current tab with class of activetabheader
    navitem.setAttribute("class","tabActiveHeader");

    //hide two tab contents we don't need
    var pages = container.querySelectorAll(".tabpage");
    for (var i = 1; i < pages.length; i++) {
        pages[i].style.display="none";
    }

    //this adds click event to tabs
    var tabs = container.querySelectorAll(".tabs ul li");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick=displayPage;
    }

    function displayPage() {
        var current = this.parentNode.getAttribute("data-current");
        //remove class of activetabheader and hide old contents
        document.getElementById("tabHeader_" + current).removeAttribute("class");
        document.getElementById("tabpage_" + current).style.display="none";

        var ident = this.id.split("_")[1];
        //add class of activetabheader to new active tab and show contents
        this.setAttribute("class","tabActiveHeader");
        document.getElementById("tabpage_" + ident).style.display="block";
        this.parentNode.setAttribute("data-current",ident);
    }
}

jQuery.fn.exists = function(){return this.length>0;}

jQuery.fn.fadeThenSlideToggle = function(speed, easing, callback) {

    if (this.is(":hidden")) {   
        return this.slideDown(speed, easing).fadeTo(speed, 1, easing, callback);
    } else {
        return this.fadeTo(speed, 0, easing).slideUp(speed, easing, callback);
    }
};



jQuery.fn.slideAndFadeToggle = function(speed, easing, callback) {
    if (this.is(":hidden")) {

    this.animate({ opacity: 1, top: "0px", height: 'toggle'}, speed, function() {/* Animation complete.*/});

} else {
this.animate({ opacity: 0, top: "0px",height: 'toggle'}, speed, function() {/* Animation complete.*/});
}
};

jQuery.fn.slideAndFadeToggleB = function(speed, easing, callback) {
    //  console.info("isHidenn: "+this.is(":hidden"));

    if (this.is(":hidden")) {
        //this.animate({ left: "0px"});
        //this.css('display', '');
        this.animate({ opacity: 1, left: "0px"}, 150,function() {$(this).css('display', '');});

    } else {
        //console.info("close efect...");
        this.animate({ opacity: 0, left: "100px"}, 150,function() {

            $(this).slideUp(300, function(){
                //console.info('slade');
                $(this).remove();
            });
            
            //console.info('FINISH!!');
            //$(this).css('display', 'none');
        });
    }
};

jQuery.fn.slideAndFadeToggleC = function(speed, easing, callback) {

    if (this.is(":hidden")) {
        //this.css('display', '');
        //this.animate({ opacity: 1, left: "0px"}, 150,function() {$(this).css('display', '');});
        //$(this).css('display', '');
        this.animate({ opacity: 1, top: "0px", height: 'toggle'}, speed, function() {/* Animation complete.*/});



    } else {        
        this.animate({ opacity: 0, left: "100px"}, speed-50,function() {
            $(this).slideUp(300, function(){});            
        });
    }
};



/**********/
//filter results based on query
//used to apply alternating row styles
function zebraRows(selector, className)
{
    $(selector).removeClass(className)
    .addClass(className);
}

//filter results based on query
function filter(selector, query) {
    query   =   $.trim(query); //trim white space
    query = query.replace(/ /gi, '|'); //add OR for regex

    $(selector).each(function() {
        ($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');
    });
}


var boxPlaceHolders= ['Try again...'
    , 'what you think??'
    , 'seriously??'
    , 'Why you so serious?'
    , 'Bingo!!'
    , 'finding... to Nemo XD'
    , 'one more?'
    , "I'll do the best..."
    , "With great power, comes great responsibility"
    , ];

OZ.sapOrganizer.getPlaceholder = function(){
    //console.info('getting holder..');
    var i = Math.floor((Math.random()*boxPlaceHolders.length));
    //console.info("return:"+i);
    var textHolder = boxPlaceHolders[i];
    //console.info("val:"+boxPlaceHolders[i]);
    return textHolder;
}


OZ.sapOrganizer.ligthSearh = function(event){

    console.info('start ligth serach');

    var inputBox = $('#magic_box');
    var boxIndicator = $('#boxIndicator');
    var resultset = $('.resulset');
     //var esc = $.Event("keyup", { keyCode: 27 });
    var placeHolder = document.getElementById('magic_box');

    var changePlaceholder=function(){
        console.info('change!! :'+ placeHolder.getAttribute('placeholder'));
        placeHolder.setAttribute('placeholder',OZ.sapOrganizer.getPlaceholder());
    }

    
    boxIndicator.on('click', function(event){

        if(inputBox.val()){
            console.info('clear');
            inputBox.val('');
            toggleIcon();
            //inputBox.trigger(esc);
            //changePlaceholder();
            showResulSet();
            event.preventDefault();
        }
        

    });

    function showResulSet(){

        console.info(inputBox.val().length+" : is hidden:"+resultset.is(":hidden"));
        var length = inputBox.val().length;

            if(length>=3 && resultset.is(":hidden")){
                resultset.slideAndFadeToggle();
            }    
            else if(length<3 && !resultset.is(":hidden")){
                resultset.slideAndFadeToggle();
            }

    }


    function toggleIcon(){

        if(inputBox.val()) {
            //console.info(' NO EMPTY');
            boxIndicator.removeClass('ico-search');
            boxIndicator.addClass('ico-clearbox');            

        }
        else{
            //console.info('EMPTY');
            boxIndicator.removeClass('ico-clearbox');
            boxIndicator.addClass('ico-search');
            //changePlaceholder();
            
            inputBox.focus();
        }

    }


    inputBox.keypress(function(e) {
        console.log("press:"+e.keyCode);

        textLen= inputBox.val().length;

         if(e.charCode == 32 ){
            e.preventDefault(); 
            return false;
         }
         else if(e.keyCode == 8 && textLen == 0){
            console.info('emp');
            e.preventDefault(); 
            return false;
            //toggleIcon();    
            
         }

        
    });

    inputBox.keyup(function(event) {
        console.log("kup:"+event.keyCode);
        //console.log(event.keyCode == 27);

        if (event.keyCode == 27) {
            event.preventDefault();            
            inputBox.val('');
            //return false;
            toggleIcon();
        }
        //else if(event.keyCode == 8 || event.keyCode > 32){
        else if(event.keyCode > 32 || event.keyCode == 8){
            toggleIcon();    
        }


        //validatte
        OZ.sapOrganizer.validateSpaces();

        showResulSet();


        
        
    });

    inputBox.change(function(e){
        console.info('blur');
      toggleIcon();  
    });
}

OZ.sapOrganizer.initBox = function(){

    console.info("initBox");
    //zebraRows('tr:odd td', 'odd');

    var e= '#dynDeatilTable table tbody tr';
    var tel= $(e);
    var inputBox = $('#magic_box');

    var iconLigthin = $('#op_fast_search');


    //tel.css( "color", "green" );

    /*tel.hover(function(){
        $(this).find('td').addClass('hovered');
    }, function(){
        $(this).find('td').removeClass('hovered');
    });*/

    //default each row to visible
    tel.addClass('visible');

    //overrides CSS display:none property
    //so only users w/ JS will see the
    //filter box
    //$('#search').show();
    
    var boxIndicator = $('#boxIndicator');

    var esc = $.Event("keyup", { keyCode: 27 });

    boxIndicator.on('click', function(){

            if(inputBox.val()){
                console.info('clear');
                inputBox.trigger(esc);
            }
            else{
                event.preventDefault;
                return

            }    
    });


    inputBox.keyup(function(event) {


        //console.log(event.keyCode == 27);
        if (event.keyCode == 27) {
            boxIndicator.removeClass('ico-clearbox');
            boxIndicator.addClass('ico-search');
            inputBox.val('');
            
        }


        if(inputBox.val()) {
        //console.info(' NO EMPTY');
        boxIndicator.removeClass('ico-search');
        boxIndicator.addClass('ico-clearbox');

        }
        else{
            //console.info('EMPTY');

            iconLigthin.css( "color", "" );
            boxIndicator.removeClass('ico-clearbox');
            boxIndicator.addClass('ico-search');
        }

        //if esc is pressed or nothing is entered
        if (event.keyCode == 27 || $(this).val() == '') {
            //if esc is pressed we want to clear the value of search box
            $(this).val('');

            //we want each row to be visible because if nothing
            //is entered then all rows are matched.
            tel.removeClass('visible').show().addClass('visible');
        }

        //if there is text, lets filter
        else {
            filter(e, $(this).val());
        }

        //reapply zebra rows
        $('.visible td').removeClass('odd');
        //zebraRows('.visible:even td', 'odd');
    });

    //grab all header rows
    $('thead th').each(function(column) {
        $(this).addClass('sortable')
        .click(function(){
            var findSortKey = function($cell) {
                return $cell.find('.sort-key').text().toUpperCase() + ' ' + $cell.text().toUpperCase();
            };

            var sortDirection = $(this).is('.sorted-asc') ? -1 : 1;

                //step back up the tree and get the rows with data
                //for sorting
                var $rows       = $(this).parent()
                .parent()
                .parent()
                .find(e)
                .get();

                //loop through all the rows and find
                $.each($rows, function(index, row) {
                    row.sortKey = findSortKey($(row).children('td').eq(column));
                });

                //compare and sort the rows alphabetically
                $rows.sort(function(a, b) {
                    if (a.sortKey < b.sortKey) return -sortDirection;
                    if (a.sortKey > b.sortKey) return sortDirection;
                    return 0;
                });

                //add the rows in the correct order to the bottom of the table
                $.each($rows, function(index, row) {
                    $('tbody').append(row);
                    row.sortKey = null;
                });

                //identify the column sort order
                $('th').removeClass('sorted-asc sorted-desc');
                var $sortHead = $('th').filter(':nth-child(' + (column + 1) + ')');
                sortDirection == 1 ? $sortHead.addClass('sorted-asc') : $sortHead.addClass('sorted-desc');

                //identify the column to be sorted by
                $('td').removeClass('sorted')
                .filter(':nth-child(' + (column + 1) + ')')
                .addClass('sorted');

                $('.visible td').removeClass('odd');
                //zebraRows('.visible:even td', 'odd');
            });
    });
}

OZ.sapOrganizer.selDetBox = function(o){

    var selClass='selectedBox';

    o.on( "click", function(e) {

        //console.log("El clicked!");
        //console.log(o.hasClass(selClass));

        if(o.hasClass(selClass)){
            o.removeClass(selClass);
        }
        else{
            o.addClass(selClass);
        }   
        e.stopPropagation();
            
    });
    

}


OZ.sapOrganizer.ligthingSearch = function(){

    var text= document.getElementById('magic_box');

    console.info("search:"+text.value);

    var data = OZ.sapOrganizer.getBody();    




    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            console.info(key + " -> " + data[key]);
        }
    }


}


var patt= new RegExp("\\s+");
var text= document.getElementById('magic_box');    

OZ.sapOrganizer.validateSpaces = function(e){

    console.info("val:"+text.value);

        if(patt.test(text.value)){

            text.value="";
            console.info("You're a cheater!:");
            e.preventDefault();
            
        }
}


Oz.sapOrganizer.serachMap = function(){

    var tags = [
    {tagId: 1, tagName: 'tag 1'},
    {tagId: 2, tagName: 'tag 2'},
    {tagId: 3, tagName: 'tag 3'},
    {tagId: 99, tagName: 'tag 99'},
    {tagId: 100, tagName: 'tag 100'}
    ];

    var tagMap = {};
    var i = null;
    for (i = 0; tags.length > i; i += 1) {
        tagMap[tags[i].tagName] = tags[i];
    }
 
    var hasTag = function(tagName) {
        return tagMap[tagName];
    };

}
