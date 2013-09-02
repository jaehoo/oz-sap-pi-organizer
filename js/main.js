var OZ = OZ || '';



//Generates some data. This step is of course normally done by your web server.
function getData() {

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