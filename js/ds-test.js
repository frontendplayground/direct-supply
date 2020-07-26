var DSTest = {
    pageHeading : 'New Faces',
    pageBlurb : 'Attention partners, here are last month\'s new hires . Please feel free to introduce yourself if you see any of them sitting by themselves in the cafeteria of acting lost anywhere else on campus:)',
    employeeList : {},
    init: function(){
        // check if wrapping div with the namespace class exists
        if(!$('.ds').is('*')) return;
        this.bindUIfunctions();
    },
    bindUIfunctions: function(){
        var obj = this;
        // Delegation
        // document related events
        $(document)
        .on('click','#sort-id-ascending', function(){
                obj.sortByIdAscending();
                // obj.logEmployees();
                obj.displayEmployeeList();
            }
        )
        .on('click','#sort-id-descending', function(){
                obj.sortByIdDescending ();
                // obj.logEmployees();
                obj.displayEmployeeList();
                
            }
        )
        .on('click','#sort-first-name', function(){
                obj.sortByFirsttName();
                // obj.logEmployees();
                obj.displayEmployeeList();
                
            } 
        )
        .on('click','#sort-last-name', function(){
                obj.sortByLastName();
                // obj.logEmployees();
                obj.displayEmployeeList();
                
            }
        );
        
        // window related events
        $(window)
            .on('load', function(){
                obj.getData();
            })
            .on('scroll', function(){
                obj.makeSortButtonsSticky();
            })
    
    },

getData : function(){

    $.ajax("https://code-test-direct-supply.pantheonsite.io/wp-json/code-test/people")
        .done(function(data) {
            // put the responce data into a property 
            DSTest.employeeList = data.people;
            console.log('%cThe AJAX request was successful! ', 'color: green; font-weight:bold;');
        })
        .fail(function() {
            console.error("CRITICAL: AJAX request resulted in error");
        })
        .always(function() {
            DSTest.logEmployees();

            DSTest.injectDependencies();

            DSTest.buildPageHeading();

            DSTest.buildPageBlurb();

            DSTest.buildSortButtons();

            DSTest.displayEmployeeList();
            
        });
    ;
},
// helper method used for debugging
logEmployees : function(){
    console.log('%cPAYLOAD :', 'color: blue; font-weight:bold;');
    console.table(DSTest.employeeList);
},

// Inject dependecies and build msrkup structure

injectDependencies : function(){

    console.log('%cAttempting to inject dependencies...', 'color: orange; font-weight:bold;');

    // appending the stylesheet
    $('head').append(' <link rel="stylesheet" href="css/ds-test.css">');

    console.log('%cCSS is added!', 'color: green; font-weight:bold;');

    // Populating page heading 
    $('.et_pb_module_header').append(' <span id="page-heading" class="ds-page-heading"></span>');
        console.log('%cHero unit H1 header content container is added!', 'color: green; font-weight:bold;');

    // Populating page hero unit blurb 
    $('.et_pb_header_content_wrapper').append(' <span id="page-blurb" class="ds-page-blurb"></span>');
    console.log('%cHero unit blurb content container is added!', 'color: green; font-weight:bold;');

    // Creating containers to hold sort buttons & employee cards
    $('.ds').append('<div id="sort-buttons" class="ds-sort-buttons"></div><div id="employees" class="ds-employee-cards"></div>');
    console.log('%cThe containers to hold sort buttons and cards are added!', 'color: green; font-weight:bold;');

    console.log('%cDependency injection is COMPLETE!!', 'color: green; font-weight:bold;');
},

buildPageHeading : function(){

        try {
            console.log('%cAttempting to build out page H1 heading...', 'color: orange; font-weight:bold;');
             var output =  DSTest.pageHeading;

             console.log("Checking if object contains nesseary heading data...");
             if(DSTest.pageHeading.replace(/\s/,'').length <= 0) {
                 throw new Error('The h1 heading content is missing... Check DSTest.pageHeading property');
             };
            
        } catch (error) {
            console.error(error.message);
            
        }finally{
            document.getElementById("page-heading").innerHTML = output;
            console.log('%cPage heading is built!', 'color: green; font-weight:bold;');
        }

},
buildPageBlurb : function(){
      try {
        console.log('%cAttempting to build the page blurb...', 'color: orange; font-weight:bold;');
        var output =  DSTest.pageBlurb;
         console.log("Checking if object contains nesseary blurb data...");
          if(DSTest.pageBlurb.replace(/\s/,'').length <= 0) {
             throw new Error('The hero unit blurb content is missing... Check DSTest.pageBlurb property');
         };
        
    } catch (error) {
        console.error(error.message);
        
    }finally{
         // place the content into a proper place on the page
      document.getElementById("page-blurb").innerHTML = output;
      console.log('%cPage blurb is built!', 'color: green; font-weight:bold;');
    }

},


buildSortButtons: function(){

    console.log('%cAttempting to build sort buttons...', 'color: orange; font-weight:bold;');

    var output = '',
        buttons = [
        
            {
                id : 'sort-id-ascending',
                text : 'Id - Ascending'
            },
            {
                id : 'sort-id-descending',
                text : 'Id - Descending'
            },
            {
                id : 'sort-first-name',
                text : 'First Name'
            },
            {
                id : 'sort-last-name',
                text : 'Last Name'
            }
        ];

        for (var button in buttons) {
            // build the individual employee cards
                output += '<button id="' + buttons[button].id +'">' + buttons[button].text + '</button>';
        }

        // place the content into a proper place on the page
        document.getElementById("sort-buttons").innerHTML = output;
        console.log('%cSort buttons are built!', 'color: green; font-weight:bold;');

},

makeSortButtonsSticky : function(){
    var sortButtons = $("#sort-buttons"),
    sortButtonsOffset =  sortButtons.offset().top - 200,
    windowScrollsTo = $(window).scrollTop(),
    employees = $('.ds-employee-cards'),
    employeesOffset = employees.offset().top;
    
    windowScrollsTo == sortButtonsOffset ? sortButtons.addClass("is-fixed") : sortButtons.removeClass("is-fixed");
    windowScrollsTo <  employeesOffset ? sortButtons.removeClass("is-fixed") : sortButtons.addClass("is-fixed");
},

// sorting methods

sortByIdDescending : function(){
    DSTest.employeeList.sort(function(a, b){
        return b.id - a.id;
    });
},
sortByIdAscending : function(){
    DSTest.employeeList.sort(function(a, b){
        return a.id - b.id;
    });  
},

sortByFirsttName : function(){
    DSTest.employeeList.sort(
        function(a, b){
            return (a.first_name < b.first_name  ? -1 : 1);   
        }
    );  
},

sortByLastName : function(){
    DSTest.employeeList.sort(
        function(a, b){
            return (a.last_name < b.last_name  ? -1 : 1);   
        }
    );  
},

displayEmployeeList : function(){

    console.log('%cAttempting to display data...', 'color: orange; font-weight:bold;');
    // check if there is any data to display
    console.log("Checking if object contains nesseary employee data...");
    if(!DSTest.employeeList.length > 0 ) {
        console.error('The employee data array is empty. Check if AJAX request was successful.');
        return
    };

    console.log("Found employee data. Building out employee cards now ...");

        var output = '';
        // loop through all of the data
        for (var employee in this.employeeList) {
            // build the individual employee cards
                output += "<div class='ds-employee-card'> " +
                    "<img src=' " + DSTest.employeeList[employee].avatar + "' class='ds-employee-card--avatar' /><br>" +
                    "<p class='ds-employee-card--name'> " + DSTest.employeeList[employee].first_name + ' ' + DSTest.employeeList[employee].last_name + "</p>" +
                    "<p class='ds-employee-card--title'> " + DSTest.employeeList[employee].job_role + "</p>" +
                    "<p class='ds-employee-card--email'> " + DSTest.employeeList[employee].email + "</p>"+
                    "<p class='ds-employee-card--id'> Employee ID: " + DSTest.employeeList[employee].id + "</p>" +
                "</div>" ;

                console.log('%cThe employee card for '+ DSTest.employeeList[employee].first_name + ' ' + DSTest.employeeList[employee].last_name +' is built!', 'color: green;');
            }

        // place the content into a proper place on the page
        document.getElementById("employees").innerHTML = output;
        console.log('%cAll of the employee cards are built!', 'color: green; font-weight:bold;');
}
    
}

DSTest.init();