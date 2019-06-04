import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';
declare var $;
var $this;


@Component({
  selector: 'app-catalogo-kpi',
  templateUrl: './catalogo-kpi.component.html',
  styleUrls: ['./catalogo-kpi.component.scss']
})
export class CatalogoKpiComponent implements OnInit {
  @ViewChild('kpiTable') block: ElementRef;
  @ViewChild('searchCol1') searchCol1: ElementRef;
  @ViewChild('searchCol2') searchCol2: ElementRef;
  @ViewChild('searchCol3') searchCol3: ElementRef;
  @ViewChild('searchCol4') searchCol4: ElementRef;
  @ViewChild('searchCol5') searchCol5: ElementRef;
  @ViewChild('btnExportCSV') btnExportCSV: ElementRef;


  constructor() {
    $this = this;
  }

  ngOnInit() {
    setTimeout(()=>{this.initializeKpiTable();},1000);
  }

  initializeKpiTable(){
    let datatable_Ref = $(this.block.nativeElement).DataTable({
      'dom': 'rtip'
    });

    // #column3_search is a <input type="text"> element
    $(this.searchCol1.nativeElement).on( 'keyup', function () {
      datatable_Ref
        .columns( 4 )
        .search( this.value )
        .draw();
    });
    $(this.searchCol2.nativeElement).on( 'keyup', function () {
      datatable_Ref
        .columns( 5 )
        .search( this.value )
        .draw();
    });
    $(this.searchCol3.nativeElement).on( 'keyup', function () {
      datatable_Ref
        .columns( 10 )
        .search( this.value )
        .draw();
    });
    datatable_Ref.columns(3).every( function () {
      var that = this;

      // Create the select list and search operation
      var select = $($this.searchCol4.nativeElement)
        .on( 'change', function () {
          that
            .search( $(this).val() )
            .draw();
        } );

      // Get the search data for the first column and add to the select list
      this
        .cache( 'search' )
        .sort()
        .unique()
        .each( function ( d ) {
          select.append( $('<option value="'+d+'">'+d+'</option>') );
        } );
    } );
    datatable_Ref.columns(9).every( function () {
      var that = this;

      // Create the select list and search operation
      var select = $($this.searchCol5.nativeElement)
        .on( 'change', function () {
          that
            .search( $(this).val() )
            .draw();
        } );

      // Get the search data for the first column and add to the select list
      this
        .cache( 'search' )
        .sort()
        .unique()
        .each( function ( d ) {
          select.append( $('<option value="'+d+'">'+d+'</option>') );
        } );
    } );


    // export only what is visible right now (filters & paginationapplied)
    $(this.btnExportCSV.nativeElement).click(function (event) {
      event.preventDefault();
      //$this.table2csv(datatable_Ref, 'visible', 'table.dataTables-reports');
      $this.table2csv(datatable_Ref, 'full', 'table.dataTables-reports');
    });
  }


  table2csv(oTable, exportmode, tableElm) {
    var csv = '';
    var headers = [];
    var rows = [];

    // Get header names
    $(tableElm+' thead').find('th').each(function() {
      var $th = $(this);
      var text = $th.text();
      var header = '"' + text + '"';
      // headers.push(header); // original code
      if(text != "") headers.push(header); // actually datatables seems to copy my original headers so there ist an amount of TH cells which are empty
    });
    csv += headers.join(',') + "\n";

    // get table data
    if (exportmode == "full") { // total data
      var totalRows = oTable.data().length;
      for(let i = 0; i < totalRows; i++) {
        var row = oTable.row(i).data();
        console.log(row)
        row = $this.strip_tags(row);
        rows.push(row);
      }
    } else { // visible rows only
      $(tableElm+' tbody tr:visible').each(function(index) {
        var row = [];
        $(this).find('td').each(function(){
          var $td = $(this);
          var text = $td.text();
          var cell = '"' +text+ '"';
          row.push(cell);
        });
        rows.push(row);
      })
    }
    csv += rows.join("\n");
    console.log(csv);
    var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "CatalogKpi.csv");
  }

  strip_tags(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent||tmp.innerText;
  }


}
