$(function(){
    function initBackgrid(){
        Backgrid.InputCellEditor.prototype.attributes.class = 'form-control form-control-sm';

        let Territory = Backbone.Model.extend({});

        let PageableTerritories = Backbone.PageableCollection.extend({
            model: Territory,
            url: "../demo/json/pageable-territories.json",
            state: {
                pageSize: 9
            },
            mode: "client" // page entirely on the client side
        });

        let pageableTerritories = new PageableTerritories(),
            initialTerritories = pageableTerritories;

        function createBackgrid(collection){
            let columns = [{
                name: "id", // The key of the model attribute
                label: "ID", // The name to display in the header
                editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
                // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
                cell: Backgrid.IntegerCell.extend({
                    orderSeparator: ''
                })
            }, {
                name: "name",
                label: "Name",
                // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
                cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
            }, {
                name: "pop",
                label: "Population",
                cell: "integer" // An integer cell is a number cell that displays humanized integers
            }, {
                name: "url",
                label: "URL",
                cell: "uri" // Renders the value in an HTML <a> element
            }];
            if (Sing.isScreen('xs')){
                columns.splice(3,1)
            }
            let pageableGrid = new Backgrid.Grid({
                columns: columns,
                collection: collection,
                className: 'table table-striped table-editable no-margin mb-sm'
            });

            let paginator = new Backgrid.Extension.Paginator({

                slideScale: 0.25, // Default is 0.5

                // Whether sorting should go back to the first page
                goBackFirstOnSort: false, // Default is true

                collection: collection,

                controls: {
                    rewind: {
                        label: '<i class="fa fa-angle-double-left fa-lg"></i>',
                        title: "First"
                    },
                    back: {
                        label: '<i class="fa fa-angle-left fa-lg"></i>',
                        title: "Previous"
                    },
                    forward: {
                        label: '<i class="fa fa-angle-right fa-lg"></i>',
                        title: "Next"
                    },
                    fastForward: {
                        label: '<i class="fa fa-angle-double-right fa-lg"></i>',
                        title: "Last"
                    }
                }
            });

            $("#table-dynamic").html('').append(pageableGrid.render().$el).append(paginator.render().$el);
        }

        SingApp.onResize(function(){
            createBackgrid(pageableTerritories);
        });

        createBackgrid(pageableTerritories);

        $("#search-countries").keyup(function(){

            let $that = $(this),
                filteredCollection = initialTerritories.fullCollection.filter(function(el){
                    return ~el.get('name').toUpperCase().indexOf($that.val().toUpperCase());
                });
            createBackgrid(new PageableTerritories(filteredCollection, {
                state: {
                    firstPage: 1,
                    currentPage: 1
                }
            }));
        });

        pageableTerritories.fetch();

        $('.input-group-transparent, .input-group-no-border').transparentGroupFocus();
    }
    function initDataTables(){
        /* Set the defaults for DataTables initialisation */
        $.extend( true, $.fn.dataTable.defaults, {
            "sDom": "<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ records per page"
            }
        } );


        /* Default class modification */
        $.extend( $.fn.dataTableExt.oStdClasses, {
            "sWrapper": "dataTables_wrapper form-inline"
        } );


        /* API method to get paging information */
        $.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
        {
            return {
                "iStart":         oSettings._iDisplayStart,
                "iEnd":           oSettings.fnDisplayEnd(),
                "iLength":        oSettings._iDisplayLength,
                "iTotal":         oSettings.fnRecordsTotal(),
                "iFilteredTotal": oSettings.fnRecordsDisplay(),
                "iPage":          oSettings._iDisplayLength === -1 ?
                    0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
                "iTotalPages":    oSettings._iDisplayLength === -1 ?
                    0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
            };
        };


        /* Bootstrap style pagination control */
        $.extend( $.fn.dataTableExt.oPagination, {
            "bootstrap": {
                "fnInit": function( oSettings, nPaging, fnDraw ) {
                    let oLang = oSettings.oLanguage.oPaginate;
                    let fnClickHandler = function ( e ) {
                        e.preventDefault();
                        if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
                            fnDraw( oSettings );
                        }
                    };

                    $(nPaging).append(
                            '<ul class="pagination col-12-lg no-margin">'+
                            '<li class="prev disabled page-item"><a class="page-link" href="#">'+oLang.sPrevious+'</a></li>'+
                            '<li class="next disabled page-item"><a class="page-link" href="#">'+oLang.sNext+'</a></li>'+
                            '</ul>'
                    );
                    let els = $('a', nPaging);
                    $(els[0]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
                    $(els[1]).bind( 'click.DT', { action: "next" }, fnClickHandler );
                },

                "fnUpdate": function ( oSettings, fnDraw ) {
                    let iListLength = 5;
                    let oPaging = oSettings.oInstance.fnPagingInfo();
                    let an = oSettings.aanFeatures.p;
                    let i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

                    if ( oPaging.iTotalPages < iListLength) {
                        iStart = 1;
                        iEnd = oPaging.iTotalPages;
                    }
                    else if ( oPaging.iPage <= iHalf ) {
                        iStart = 1;
                        iEnd = iListLength;
                    } else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
                        iStart = oPaging.iTotalPages - iListLength + 1;
                        iEnd = oPaging.iTotalPages;
                    } else {
                        iStart = oPaging.iPage - iHalf + 1;
                        iEnd = iStart + iListLength - 1;
                    }

                    for ( i=0, ien=an.length ; i<ien ; i++ ) {
                        // Remove the middle elements
                        $('li:gt(0)', an[i]).filter(':not(:last)').remove();

                        // Add the new list items and their event handlers
                        for ( j=iStart ; j<=iEnd ; j++ ) {
                            sClass = (j==oPaging.iPage+1) ? 'class="page-item active"' : 'class="page-item"';
                            $('<li '+sClass+'><a class="page-link" href="#">'+j+'</a></li>')
                                .insertBefore( $('li:last', an[i])[0] )
                                .bind('click', function (e) {
                                    e.preventDefault();
                                    oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
                                    fnDraw( oSettings );
                                } );
                        }

                        // Add / remove disabled classes from the static elements
                        if ( oPaging.iPage === 0 ) {
                            $('li:first', an[i]).addClass('disabled');
                        } else {
                            $('li:first', an[i]).removeClass('disabled');
                        }

                        if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
                            $('li:last', an[i]).addClass('disabled');
                        } else {
                            $('li:last', an[i]).removeClass('disabled');
                        }
                    }
                }
            }
        } );

        let unsortableColumns = [];
        $('#datatable-table').find('thead th').each(function(){
            if ($(this).hasClass( 'no-sort')){
                unsortableColumns.push({"bSortable": false});
            } else {
                unsortableColumns.push(null);
            }
        });

        $("#datatable-table").dataTable({
            "sDom": "<'row'<'col-lg-6 hidden-sm-down'l><'col-lg-6 col-sm-12'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
            "oLanguage": {
                "sLengthMenu": "_MENU_",
                "sInfo": "Showing <strong>_START_ to _END_</strong> of _TOTAL_ entries"
            },
            "oClasses": {
              "sFilter": "float-right",
              "sFilterInput": "form-control input-rounded ml-sm"
            },
            "aoColumns": unsortableColumns
        });

        $(".dataTables_length select").selectpicker({
            width: 'auto'
        });
    }

    function pageLoad(){
        $('.widget').widgster();
        initBackgrid();
        initDataTables();
    }

    pageLoad();
    SingApp.onPageLoad(pageLoad);
});
