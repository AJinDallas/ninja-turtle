var turtleProj = (function () {

    var turtle = [];
    var guid;
    // Turtle constructor-------------------------------------------------------------------
    function turtleObj(name, weapon, headband, phrase, attack, guid) {
        this.name = name;
        this.weapon = weapon;
        this.headband = headband;
        this.phrase = phrase;
        this.attack = attack;
        this.id = guid;
    }

    //CREATE -------------------------------------------------------------------------------------------
    var ninja1 = new turtleObj("Michaelangelo", "NunChucks", "Orange", "Cowabunga dude", "Diversion");
    var ninja2 = new turtleObj("Leonardo", "Sword", "blue", "Cowabunga", "Stealth");
    console.log("its working");
       turtle[0] = ninja1;
    turtle[1] = ninja2;
    for (var i in turtle) {
        console.log("==>", turtle[i]);
    }
    // Add Turtle -------------------------------------------------------------------------------

    function addTurtle() {
        var tCnt;                   // temp turtle 
        var tStr = "";
        var tRes = "";
        var tRes = $("#tableResults");
        tRes.empty();               // clear the html
        var tName = document.getElementById("name").value;
        var tWeapon = document.getElementById("weapon").value;
        var tHeadband = document.getElementById("headbandcolor").value;
        var tPhrase = document.getElementById("catchphrase").value;
        var tAttack = document.getElementById("attack").value;

        var tempninja = new turtleObj(tName, tWeapon, tHeadband, tPhrase, tAttack);
        turtle.push(tempninja);
        for (var i in turtle) {
            var ninja = turtle[i];
            console.log(i);
            var editBtn = '<button onclick="turtleProj.doEdit(' + i + ')" class="btn btn-warning btn-xs">'
                + 'edit</button>'
            var deleteBtn = '<button onclick="turtleProj.doDelete(' + i + ')" class="btn btn-danger btn-xs">' +
                ' delete</button>'
            var firebaseBtn = '<button onclick="turtleProj.doAjax(' + i + ')" class="btn btn-danger btn-xs">' +
               ' Fire Away</button>'
            turtle.sort(function (a, b) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });



            // render to screen
            tStr = "";              // clear the temp string
            tStr += "<tr>";
            tStr += "<td>" + (i + 1) + "</td>";
            tStr += "<td>" + ninja.name + "</td>";
            tStr += "<td>" + ninja.weapon + "</td>";
            tStr += "<td>" + ninja.headband + "</td>";
            tStr += "<td>" + ninja.phrase + "</td>";
            tStr += "<td>" + ninja.attack + "</td>";
            tStr += "<td>" + editBtn + " " + deleteBtn + " " + firebaseBtn + "</td>";
            tStr += "</tr>"

            //counter++;
            tRes.append(tStr);

        }
    }
    // AJAX call for POST
    function AJAX(i) {
        var request = new XMLHttpRequest();
        request.open('POST', 'https://ninjaturtlework.firebaseio.com/.json', true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                console.log("Success");
            }
            else {
                console.log("Error");
            }
        };
        request.send(JSON.stringify(turtle[i]));
    }
    // populate & show the modal
    function showEditDialog(tempId) {
        // save the ID to local variable
        guid = tempId
        TurtleToUpdate = turtle[tempId].id;
        turtleToUpdate = tempId;

        // create temp object of turtle in array (based on index argument)
        var tTurtle = turtle[tempId];
        //populate the fields
        $('#uname').val(tTurtle.name);
        $('#uweapon').val(tTurtle.weapon);
        $('#uheadband').val(tTurtle.headband);
        $('#uphrase').val(tTurtle.phrase);
        $('#uattack').val(tTurtle.attack);
        $('#myEditModal').modal("show");
        //
        console.log("THE TURTLE TO UPDATE:", tTurtle);
        console.log("THE ID for the turtle to update:", turtleToUpdate);

    }

    // save the contents of the modal
    function updateTurtle() {
        console.log(turtle[guid]);
        turtle[guid].name = $('#uname').val();
        turtle[guid].weapon = $('#uweapon').val();
        turtle[guid].headband = $('#uheadband').val();
        turtle[guid].phrase = $('#uphrase').val();
        turtle[guid].attack = $('#uattack').val();
        var tStr = "";
        var tRes = "";
        var tRes = $("#tableResults");
        tRes.empty();               // clear the html

        for (var i in turtle) {
            var ninja = turtle[i];
            console.log(i);
            var editBtn = '<button onclick="turtleProj.doEdit(' + i + ')" class="btn btn-warning btn-xs">'
                + 'edit</button>'
            var deleteBtn = '<button onclick="turtleProj.doDelete(' + i + ')" class="btn btn-danger btn-xs">' +
                ' delete</button>'
            var firebaseBtn = '<button onclick="turtleProj.doAjax(' + i + ')" class="btn btn-danger btn-xs">' +
                ' Fire Away</button>'

            // render to screen
            tStr = "";              // clear the temp string
            tStr += "<tr>";
            tStr += "<td>" + (i + 1) + "</td>";
            tStr += "<td>" + ninja.name + "</td>";
            tStr += "<td>" + ninja.weapon + "</td>";
            tStr += "<td>" + ninja.headband + "</td>";
            tStr += "<td>" + ninja.phrase + "</td>";
            tStr += "<td>" + ninja.attack + "</td>";
            tStr += "<td>" + editBtn + " " + deleteBtn + " " + firebaseBtn + "</td>";
            tStr += "</tr>"

            tRes.append(tStr);

        }
    }



    //DELETE------------------------------------------------------------
    function deleteTurtle(i) {
        var tStr = "";
        var tRes = "";
        var tRes = $("#tableResults");
        tRes.empty();               // clearing the html here
        turtle.splice(i, 1);
        for (var i in turtle) {
            var ninja = turtle[i];
            console.log(i);
            var editBtn = '<button onclick="turtleProj.doEdit(' + i + ')" class="btn btn-warning btn-xs">'
                + 'edit</button>'
            var deleteBtn = '<button onclick="turtleProj.doDelete(' + i + ')" class="btn btn-danger btn-xs">' +
                ' delete</button>'
            var firebaseBtn = '<button onclick="turtleProj.doAjax(' + i + ')" class="btn btn-danger btn-xs">' +
               ' Fire Away</button>'

            // render to screen
            tStr = "";              // clearing the temp string here
            tStr += "<tr>";
            tStr += "<td>" + (i + 1) + "</td>";
            tStr += "<td>" + ninja.name + "</td>";
            tStr += "<td>" + ninja.weapon + "</td>";
            tStr += "<td>" + ninja.headband + "</td>";
            tStr += "<td>" + ninja.phrase + "</td>";
            tStr += "<td>" + ninja.attack + "</td>";
            tStr += "<td>" + editBtn + " " + deleteBtn + " " + firebaseBtn + "</td>";
            tStr += "</tr>"

            tRes.append(tStr);

        }
    }


    // Public Methods---------------------------------------
    return {
        doAdd: addTurtle,
        doDelete: deleteTurtle,
        doSave: updateTurtle,
        doEdit: showEditDialog,
        doAjax: AJAX
    }


})();
