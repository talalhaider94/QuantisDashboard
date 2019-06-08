import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';
declare var $;
var $this;


@Component({
  selector: 'app-catalogo-kpi',
  templateUrl: './archivedkpi.component.html'
})
export class ArchivedKpiComponent implements OnInit {
  @ViewChild('ArchivedkpiTable') block: ElementRef;
  @ViewChild('searchCol1') searchCol1: ElementRef;


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
        .columns( 0 )
        .search( this.value )
        .draw();
    });

  }

  strip_tags(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent||tmp.innerText;
  }


}
