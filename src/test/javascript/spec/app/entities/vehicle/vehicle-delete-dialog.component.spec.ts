/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { IcnpushTestModule } from '../../../test.module';
import { VehicleDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/vehicle/vehicle-delete-dialog.component';
import { VehicleService } from '../../../../../../main/webapp/app/entities/vehicle/vehicle.service';

describe('Component Tests', () => {

    describe('Vehicle Management Delete Component', () => {
        let comp: VehicleDeleteDialogComponent;
        let fixture: ComponentFixture<VehicleDeleteDialogComponent>;
        let service: VehicleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [IcnpushTestModule],
                declarations: [VehicleDeleteDialogComponent],
                providers: [
                    VehicleService
                ]
            })
            .overrideTemplate(VehicleDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
