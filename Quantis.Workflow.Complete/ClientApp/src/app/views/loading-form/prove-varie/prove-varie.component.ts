import { Component, OnInit,ViewChild, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators,FormControl,FormArray } from '@angular/forms';
// import { ApiServiceService } from '../api-service.service';
import { DateAdapter } from '@angular/material';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
// import { json } from 'sequelize';
import { ApiCloudService } from '../services/api-cloud.service';
import { HttpClient, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription, of } from 'rxjs';
import { tap, map, filter,last,catchError } from 'rxjs/operators';
import { Form } from '../form';
import { ApiFormService } from '../services/form/api-form.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { FormField } from '../classes/FormField';
import { UserSubmitLoadingForm } from '../classes/UserSubmitLoadingForm';
import { FormAttachments } from '../classes/Attachment';
import * as moment from 'moment';


export class FormClass{
  form_id:number;
  // form_body: json;
  form_body;
}

export class ControlloCampo{
  min:any;
  max:any;
}

export class ControlloConfronto{
    campo1:any='';
    segno:string='';
    campo2:any='';
  }

  const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-prove-varie',
  templateUrl: './prove-varie.component.html',
  styleUrls: ['./prove-varie.component.scss']
})
export class ProveVarieComponent implements OnInit {
  
  public listaKpiPerForm=[];
  defaultFont=[];
  jsonRicevuto;

  public myInputForm: FormGroup;
  private files: Array<FileUploadModel> = [];

  aglia:boolean=false;
  /*per i filtri uso degli array per poter dichiarare e 
  salvare diverse variabili module, in questo modo
  indicizzo e rendo possibile la dinamicità dei campi filtro
  */
  //lo uso sia per i number che per le stringhe
  numeroMax:number[] = [];
  numeroMin:number[] = [];
  // filto per le date
  maxDate:any[] = [];
  minDate:any[] = [];

  dt:any[]=[];
  numero:number[]=[];
  stringa:string[]=[];
  daje:boolean =false;

  isAdmin:boolean = false;

  erroriArray:string[]=[];

  jsonFiltri:json;
  mappaFiltri:Map<string,any>;
  arraySecondo=new Array;
  confronti:string[]=['<','>','=','!=','>=','<='];
  displayedColumns: string[] = ['form_id', 'form_name', 'user_group_name','cutoff'];
  dataSource = new MatTableDataSource();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  mostraTabella:boolean = false;
  vai:boolean = false;
  //vai:boolean = true;
  arrayFormElements:any=[];

  jsonForm:any=[];

  numeroForm:number;
  title:string = '';
  checked:boolean;


/** Link text */
@Input() text = 'Upload';
/** Name used in form which will be sent in HTTP request. */
@Input() param = 'file';
/** Target URL for file uploading. */
@Input() target = 'https://file.io';
/** File extension that accepted, same as 'accept' of <input type="file" />. 
    By the default, it's set to 'image/*'. */
@Input() accept = 'image/*';
/** Allow you to add handler after its completion. Bubble up response text from remote. */
@Output() complete = new EventEmitter<string>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("filtro") filtro: ElementRef;
  
  angForm: FormGroup;
  // private apiService:ApiServiceService
  constructor(private http: HttpClient,private adapter: DateAdapter<any>, private apicloudService:ApiCloudService,private fb: FormBuilder,private apiFormService : ApiFormService) {}

      initInputForm(){
        return this.fb.group({
          valoreUtente:[''],
          valoreMin:[''],
          valoreMax:['']
        })   
      }

      addInputForm() {
        const control = <FormArray>this.myInputForm.controls['valories'];
        control.push(this.initInputForm());
      }

      /*initComparisonForm(){
        return this.fb.group({
          campo1:[''],
          segno:[''],
          campo2:['']
        })
      }*/

      initComparisonForm(array){
        return this.fb.group({
          campo1:[{value: array.campo1, disabled: false}],
          segno:[{value: array.segno, disabled: false}],
          campo2:[{value: array.campo2, disabled: false}]
        })
      }

      addComparisonForm(array){
        if(array==''){
          array = new ControlloConfronto;
        }
        const control = <FormArray>this.myInputForm.controls['campiConfronto'];
        control.push(this.initComparisonForm(array));
      }

      removeComparisonForm(i: number) {
        const control = <FormArray>this.myInputForm.controls['campiConfronto'];
        control.removeAt(i);
      }


      save(model:any) {
        //elementi da mettere nel json
        let jsonDaPassare:json;
        //let mappaDaPassare:Map()= new Map();
        let arrayControlli = [];
        let confrontoAppoggio = new ControlloConfronto;
        let controlloCampo = new ControlloCampo;

        this.erroriArray=[];
        let indiceAppoggio; 
        let tipo1;
        let valore1;
        let valore2;
        let datiModelConfronto = model.value.campiConfronto;

        datiModelConfronto.forEach((element,index) => {
          if(element.campo1!=null && element.segno!=null && element.campo2!=null){
            confrontoAppoggio=new ControlloConfronto;
            confrontoAppoggio.campo1 = element.campo1;
            confrontoAppoggio.segno = element.segno;
            confrontoAppoggio.campo2 = element.campo2;
            arrayControlli.push(confrontoAppoggio);
            tipo1=element.campo1.Type;
            indiceAppoggio=this.arrayFormElements.findIndex(x => x.name == element.campo1.Name);
            console.log(this.arrayFormElements);
            //console.log(datiModelConfronto);
            switch (tipo1){
              case 'string':
              valore1 = this.stringa[indiceAppoggio];
              valore2 = this.stringa[this.arrayFormElements.findIndex(x => x.name == datiModelConfronto[index].campo2.Name)];
              break;

              case 'time':
              valore1 = this.dt[indiceAppoggio];
              valore2 = this.dt[this.arrayFormElements.findIndex(x => x.name == datiModelConfronto[index].campo2.Name)];
              break;

              default:
              valore1 = this.numero[indiceAppoggio];
              valore2 = this.numero[this.arrayFormElements.findIndex(x => x.name == datiModelConfronto[index].campo2.Name)];
              break;
            }
            this.checkConfronto(valore1,valore2,datiModelConfronto[index].segno,element.campo1,element.campo2);

            return;
          }
          
        });
        if(this.erroriArray.length>0){
          return;
        }else{
          this.arrayFormElements.forEach((element,index) => {
            controlloCampo = new ControlloCampo;
            if(element.type=='time'){
              controlloCampo.max = this.maxDate[index];
              controlloCampo.min = this.minDate[index];
              
            }else{
              controlloCampo.max = this.numeroMax[index];
              controlloCampo.min = this.numeroMin[index];
            }
            arrayControlli.push(controlloCampo);
            console.log(arrayControlli);
            console.log('controllo campo massimo');
            console.log(controlloCampo.max);
          });
        }
       /* console.log(arrayControlli);
        console.log(JSON.stringify(arrayControlli));*/
        var formToSend = new Form;
        formToSend.form_id=this.numeroForm;

        
        //formToSend.form_body = JSON.stringify(arrayControlli).substring(1,JSON.stringify(arrayControlli).length-1);
        formToSend.form_body = JSON.stringify(arrayControlli);
       console.log(formToSend);
        this.apicloudService.createForm(formToSend).subscribe(data => {

        });

        
    }

    saveUser(){
      var formFields:FormField;
      var userSubmit:UserSubmitLoadingForm = new UserSubmitLoadingForm();
      var userAttachments:FormAttachments;
      var dataAttuale = new Date();
      dataAttuale.setMonth((dataAttuale.getMonth())-1);
      if(dataAttuale.getMonth()==12){
        dataAttuale.setFullYear(dataAttuale.getFullYear()-1);      
      }
      var periodRaw = moment(dataAttuale).format('MM/YY');
      //parte in cui riempio i valori dei campi
      this.arrayFormElements.forEach((element,index) => {
        formFields= new FormField;
        formFields.FieldName = element.name;
        formFields.FieldType = element.type;
        switch(element.type){
          case'time':
            formFields.FieldValue = this.dt[index];
            break;
          case'string':
            formFields.FieldValue = this.stringa[index];
            break;
          default:
            formFields.FieldValue = String(this.numero[index]);
            break;
        }
        userSubmit.inputs.push(formFields);       
      });
      //parte in cui riempio la lista dei file
      if(this.uploader.queue.length==0){
        this.popolaUserSubmit(periodRaw,dataAttuale,userSubmit);
      }else{
        this.uploader.queue.forEach((element,index) => {
          var file = element._file;
          userAttachments = new FormAttachments;
          var r = new FileReader();
  
          r.onloadend = (e) => {
            console.log(e);
            if(r.readyState == FileReader.DONE){
              //var bytes = new Uint8Array(r.result);
              var bytes:number[] = [];
              var a = new Uint8Array(<ArrayBuffer>r.result);
              a.forEach(data =>{
                bytes.push(data);
              });
              userAttachments.content=bytes;
              
            }
            this.popolaUserSubmit(periodRaw,dataAttuale,userSubmit);
          }
          r.readAsArrayBuffer(file);
    //      r.readAsBinaryString(file);
          userAttachments.doc_name = file.name;
          userAttachments.form_id=this.numeroForm;
          userAttachments.form_attachment_id=0;
          userAttachments.period=moment(dataAttuale).format('MM');
          userAttachments.year=dataAttuale.getFullYear();
  
          userSubmit.attachments.push(userAttachments);
        });
      }
    
    }
  
    popolaUserSubmit(periodRaw:any,dataAttuale,userSubmit){
      userSubmit.locale_id=JSON.parse(localStorage.getItem('currentUser')).localeid;
      userSubmit.form_id=String(this.numeroForm);
      userSubmit.user_id=JSON.parse(localStorage.getItem('currentUser')).userid; 
      userSubmit.empty_form = false;  
      userSubmit.period = String(periodRaw);    
      userSubmit.year =  Number(moment(dataAttuale).format('YY'));
      this.apiFormService.submitForm(userSubmit).subscribe(data => {});
    }

    checkConfronto(val1,val2,segno,elemento1,elemento2){
      switch(segno){
        case '=':
          if(val1==val2){
            
          }else{
            this.erroriArray.push(elemento1.Name+" deve essere uguale a " + elemento2.Name);
          }
        break;
        case '!=':
          if(val1!=val2){
            
          }else{
            this.erroriArray.push(elemento1.Name+" deve essere diverso di " + elemento2.Name);
          }
        break;
        case '<':
          if(val1<val2){
            
          }else{
            this.erroriArray.push(elemento1.Name+" deve essere minore di " + elemento2.Name);
          }
        break;
        case '>':
          if(val1>val2){
            
          }else{
            this.erroriArray.push(elemento1.Name+" deve essere maggiore di " + elemento2.Name);
          }
        break;
        case '>=':
          if(val1>=val2){
              
          }else{
            this.erroriArray.push(elemento1.Name+" deve essere maggiore o uguale a " + elemento2.Name);
          }
        break;
        case'<=':
          if(val1<=val2){
              
          }else{
            this.erroriArray.push(elemento1.Name+" deve essere minore o uguale a " + elemento2.Name);
          } 
        break;
      }      
    }


  ngOnInit() {
 //   console.log(JSON.parse(localStorage.getItem('currentUser')).isadmin);
   this.isAdmin =  JSON.parse(localStorage.getItem('currentUser')).isadmin;
   this.tornaIndietro();
  }

  prendiDatiForm(numero:number,nome:string){
    //dato che metto prima i filtri do confronto, 
    //quando popolo i filtri max e min vado a 
    //sottrarre all'indice il numero di confronti passati
    let contatore=0; // counter
    let array = {'campo1':'','segno':'','campo2':''};
    this.title=nome;

    this.myInputForm = this.fb.group({
      valories: this.fb.array([
          this.initInputForm()
      ]),

      campiConfronto: this.fb.array([
        //this.initComparisonForm(array)
      ])
    });
    this.apiFormService.getKpiByFormId(numero).subscribe(data => {
      console.log('getKpiByFormId', data)
      data.forEach(element => {
        this.listaKpiPerForm.push(element);
      });

    }, error => {
      console.log('getKpiByFormId', error)
    });

    this.apiFormService.getFormFilterById(numero).subscribe(data => {
      //this.jsonRicevuto = ;
      JSON.parse(data.form_body).forEach((element,index) => {
        console.log(element);
        if(element.campo1!=null){
          contatore++;
          array.campo1=element.campo1;
          array.segno=element.segno;
          array.campo2=element.campo2;
          this.defaultFont[index]=array;
          this.addComparisonForm(array);
          this.myInputForm.get('campiConfronto').controls[index].setValue(array);
        }else if(element.max!=null && element.max.length!=24){
          /*console.log(element.max);
          console.log(typeof element.max === "string");
          console.log('b '+(typeof element.max === "number"));
          console.log('c ' +(element.max.length ==24));*/
          
          
          this.numeroMax[index-contatore]=element.max;
          this.numeroMin[index-contatore]=element.min;

        }else if(element.max!=null && element.max.length==24){
          this.maxDate[index-contatore]=element.max;
          this.minDate[index-contatore]=element.min;
        }


      });
      
      
    });
    //se non ci sono filtri per questo form creo un campo vuoto
    //array=={'campo1':'','segno':'','campo2':''}?this.initComparisonForm(array):'';
      if(array.campo1 == "" && array.segno == "" && array.campo2==""){
        this.initComparisonForm(array);
        console.log(array);
      }else{
        console.log(array);
      }

    setTimeout(() => this.mostraTabella = true, 700);

    this.apiFormService.getFormById(numero).subscribe(data => {
      let jsonForm = data;

      this.arrayFormElements = jsonForm[0].reader_configuration.inputformatfield;
//      console.log(this.arrayFormElements);
      for(let i=0;i<this.arrayFormElements.length-1;i++){
        this.addInputForm();
      }

      
     // this.valori = jsonForm.FORM_NAME;
      this.numeroForm=numero;
    }); 
    
  }

  tornaIndietro(){
    //let userIdForForm = JSON.parse(localStorage.getItem('currentUser')).user_id;
    console.log(localStorage.getItem('currentUser'));

    console.log('ASSUMING CALL IS FROM HERE.')

    let userIdForForm = JSON.parse(localStorage.getItem('currentUser')).userid;
    if(this.isAdmin){
      this.apiFormService.getForms().subscribe(data =>{
        this.jsonForm = data;
        setTimeout(() => this.vai =true, 3000);
        setTimeout(() => this.dataSource.paginator = this.paginator,3000);
        setTimeout(() => this.dataSource.sort = this.sort,3000);
        this.pageSizeOptions.push(this.jsonForm);
        this.dataSource= new MatTableDataSource(this.jsonForm);
        this.daje=true;   
      })
      
    }else{
      this.apiFormService.getFormsByUserId(userIdForForm).subscribe(data => {
      this.jsonForm = data;
      setTimeout(() => this.vai =true, 3000);
      setTimeout(() => this.dataSource.paginator = this.paginator,3000);
      setTimeout(() => this.dataSource.sort = this.sort,3000);
      this.pageSizeOptions.push(this.jsonForm);
      this.dataSource= new MatTableDataSource(this.jsonForm); 
      this.daje=false;   
      });
    }
    
    this.jsonForm=null;
    this.vai=false;  
    this.mostraTabella = false;
    this.pageSizeOptions = [5, 10, 25, 100];
    //getForms()    
    console.log(this.dataSource);
  }

  applyFilter(filterValue: string) {
    this.dataSource = new MatTableDataSource(this.jsonForm);
    /* configure filter */
    this.dataSource.filterPredicate = (data:any, filter) => (data.form_name.trim().toLowerCase().indexOf(filter.trim().toLowerCase()) !== -1);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
    }
  }

  filtraElementi(campo,indice:number){
    console.log(campo);
   // this.arraySecondo[indice]=new;
   let arrayappoggio =    new Array(this.arrayFormElements);
   // this.arraySecondo[indice]=new Array(this.arrayFormElements);
    console.log(this.arraySecondo);
    this.arraySecondo[indice] =  arrayappoggio.filter(
      elemento => (elemento.Type === campo.Type)&&(elemento.Name != campo.Name));
      console.log(this.arraySecondo);
  }

  /*updateFormFilters(){
    this.apiFormService.updateForm(this.jsonFiltri);
  }*/




   
  fileData = null;
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  DatiNonPervenuti(){
    alert('ueue');
    //this.form.controls['name'].disable();
  }
 
  /*onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http.post('url/to/your/api', formData)
      .subscribe(res => {
        console.log(res);
        alert('SUCCESS !!');
      })
  }*/


  /*onClick() {   
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
          for (let index = 0; index < fileUpload.files.length; index++) {
                const file = fileUpload.files[index];
                this.files.push({ data: file, state: 'in', 
                  inProgress: false, progress: 0, canRetry: false, canCancel: true });
          }
          this.uploadFiles();
    };
    fileUpload.click();
  }*/

cancelFile(file: FileUploadModel) {    
    this.removeFileFromArray(file);
}

cancelFile1(file: FileUploadModel) {
  this.removeFileFromArray(file);
  //this.onClick();
}

retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
}
 
private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
          reportProgress: true
    });

    file.inProgress = true;
    file.sub = this.http.request(req).pipe(
          map(event => {
                switch (event.type) {
                      case HttpEventType.UploadProgress:
                            file.progress = Math.round(event.loaded * 100 / event.total);
                            //console.log('ciaone');
                            break;
                      case HttpEventType.Response:
                     // console.log('non saprei');
                            return event;
                }
          }),
          tap(message => { }),
          last(),
          catchError((error: HttpErrorResponse) => {
                file.inProgress = false;
                file.canRetry = true;
                return of(`${file.data.name} upload failed.`);
          })
    ).subscribe(
          (event: any) => {
                if (typeof (event) === 'object') {
                      this.removeFileFromArray(file);
                      this.complete.emit(event.body);
                }
          }
    );
}

  private uploadFiles() {
      const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
      fileUpload.value = '';

      this.files.forEach(file => {
            this.uploadFile(file);
      });
  }

  private removeFileFromArray(file: FileUploadModel) {
      const index = this.files.indexOf(file);
      if (index > -1) {
            this.files.splice(index, 1);
      }
  }




  
  
    public uploader:FileUploader = new FileUploader({url: URL});
    public hasBaseDropZoneOver:boolean = false;
    public hasAnotherDropZoneOver:boolean = false;
   
    public fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }
   
    public fileOverAnother(e:any):void {
      this.hasAnotherDropZoneOver = e;
    }
  


    cliccato(){
      this.uploader.queue.forEach((element,index) => {
        var reader = new FileReader();
        /*var dai:File = element._file;
        var ciaone = dai;*/
        console.log(element._file);
        console.log('prova'+reader.readAsText(element._file));
        console.log(reader.readAsText(element._file));
        //.uploader.queue[index].file
      });
      console.log(this.uploader.queue);
      //const blob = this.uploader as Blob;
      console.log('spazio################################################')
      //console.log(blob);

    }

  
}




export class FileUploadModel {
data: File;
state: string;
inProgress: boolean;
progress: number;
canRetry: boolean;
canCancel: boolean;
sub?: Subscription;
}