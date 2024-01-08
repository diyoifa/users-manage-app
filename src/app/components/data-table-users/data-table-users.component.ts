import {AfterViewInit,OnChanges, SimpleChanges, Component, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule } from '@angular/material/icon';
import { User } from '../../interfaces/user';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-data-table-users',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './data-table-users.component.html',
  styleUrl: './data-table-users.component.scss'
})

export class DataTableUsersComponent implements AfterViewInit, OnChanges {
  @Input() userList!: User[];
  @Output() showFormChange: EventEmitter<any> = new EventEmitter<any>();
  displayedColumns: string[] = ['id', 'username', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private service:UsersService, private router:Router){}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // console.log(this.userList);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userList'] && changes['userList'].currentValue) {
      this.dataSource.data = changes['userList'].currentValue;
    }
  }

  copyToClipboard(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      alert('ID Copied to clipboard');
    }).catch(err => {
      alert(`Error copying to clipboard: ${err}`);
    });
  }

  openDialog(element: User) {
    console.log(element)
    const data = {
      ...element,
      showForm: true
    };
    this.showFormChange.emit(data);
    console.log(element);
  }

  delete(element: User) {
    let user = localStorage.getItem('user');
    if(user){

      this.service.delete(element.id, JSON.parse(user).token)
      .pipe(
        catchError((error: string) => {
          if(error.includes('Error code: 401')){
            this.router.navigateByUrl('/login');
          }
          return EMPTY;
        }
      ))
      .subscribe(
        (response: any) => {
          // console.log("🚀 ~ file: register.component.ts:51 ~ RegisterComponent ~ register ~ response:", response)
          window.location.reload();
        },
      )

    }
  }
}

// export class DataTableUsersComponent implements AfterViewInit {
//   @Input() userList!: User[]

//   @Output() showFormChange: EventEmitter<boolean> = new EventEmitter<boolean>();

//   displayedColumns: string[] = ['id', 'username', 'email', 'actions'];
//   dataSource = new MatTableDataSource<User>(this.userList);

//   @ViewChild(MatPaginator)
//   paginator!: MatPaginator;

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     console.log(this.userList)
//   }

//   openDialog(element: any) {
//     // alert(`element to edit ${element}`);
//     this.showFormChange.emit(true);
//     console.log(element);
//   }
//   delete(element: any) {
//     alert(`element to delete ${element}`);
//     console.log(element);
//   }

// }

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];