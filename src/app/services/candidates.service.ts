import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCandidates() {

    return this.http.get(`${environment.apiUrl}/api/collaborators`)

  }

  getCandidateById(id: string) {

    return this.http.get(`${environment.apiUrl}/api/collaborator/${id}`)

  }

  createCandidate(formValue: any) {

    return this.http.post(`${environment.apiUrl}/api/collaborator/create`, formValue)

  }

  deleteCandidate(id: string) {

    return this.http.delete(`${environment.apiUrl}/api/collaborator/delete/${id}`)

  }

  deleteCandidateFiles(id: string) {

    return this.http.delete(`${environment.apiUrl}/api/file/delete/${id}`)

  }

  getMediasByCandidateId(id: string) {

    return this.http.get(`${environment.apiUrl}/api/file/${id}`)

  }

  updateColaborator(id: string, formValue: any) {

    return this.http.patch(`${environment.apiUrl}/api/collaborator/${id}`, formValue)

  }

  uploadFiles(id: string, formData: any) {

    return this.http.post(`${environment.apiUrl}/api/file/upload/${id}`, formData)

  }

}
