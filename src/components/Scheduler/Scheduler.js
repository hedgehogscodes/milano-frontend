import React from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import * as mainApi from "../../utils/MainApi";

const scheduler = window.scheduler;

export default class Scheduler extends React.Component {
    constructor(props) {
      super(props);
    }

    initSchedulerEvents() {

      this.addEvent = scheduler.attachEvent('onEventAdded', (id, ev) => {
        const tmp = scheduler.date.date_to_str("%d/%m/%Y")(ev.start_date).split('/')
        const tmp2 = tmp[2] + '-' + tmp[1] + '-' + tmp[0];
        const timetmp1 = ev.start_date.getHours();
        const timetmp2 = ev.start_date.getMinutes();
        const start_date = tmp2 + ' ' + timetmp1+':'+ timetmp2;

        const tmp3 = scheduler.date.date_to_str("%d/%m/%Y")(ev.end_date).split('/')
        const tmp4 = tmp3[2] + '-' + tmp3[1] + '-' + tmp3[0];
        const timetmp3 = ev.end_date.getHours();
        const timetmp4 = ev.end_date.getMinutes();
        const end_date = tmp4 + ' ' + timetmp3+':'+ timetmp4;

        const _id = ev.id;
        const text = ev.text;
        mainApi
          .createNote({ start_date, end_date, id: _id, master: this.props.noteMaster._id, text })
          .then((newNote) => {
          })
          .catch((err) => console.log(`Error ${err}`));

      });

      this.changeEvent = scheduler.attachEvent('onEventChanged', (id, ev) => {

        const tmp = scheduler.date.date_to_str("%d/%m/%Y")(ev.start_date).split('/')
        const tmp2 = tmp[2] + '-' + tmp[1] + '-' + tmp[0];
        const timetmp1 = ev.start_date.getHours();
        const timetmp2 = ev.start_date.getMinutes();
        const start_date = tmp2 + ' ' + timetmp1+':'+ timetmp2;

        const tmp3 = scheduler.date.date_to_str("%d/%m/%Y")(ev.end_date).split('/')
        const tmp4 = tmp3[2] + '-' + tmp3[1] + '-' + tmp3[0];
        const timetmp3 = ev.end_date.getHours();
        const timetmp4 = ev.end_date.getMinutes();
        const end_date = tmp4 + ' ' + timetmp3+':'+ timetmp4;

        const _id = ev.id;
        const text = ev.text;

        mainApi
          .updateNote({ start_date, end_date, id: _id, text })
          .then((newNote) => {
          })
          .catch((err) => console.log(`Error ${err}`));

      });

      this.deleteEvent = scheduler.attachEvent('onEventDeleted', (id, ev) => {
        mainApi
          .deleteNote(ev.id)
          .then((deletedNote) => {
          })
          .catch((err) => console.log(`Error ${err}`));
      });

    }

    componentDidMount() {
      scheduler.skin = 'material';
      scheduler.i18n.setLocale("ru");
      const compactHeader = {
        rows: [
          { 
            cols: [
              "prev",
              "date",
              "next",
            ]
          },
          { 
            cols: [
              "day",
              "week",
              "month",
              "spacer",
              "today"
            ]
          }
        ]
      };
        
      const fullHeader = [
        "day",
        "week",
        "month",
        "date",
        "prev",
        "today",
        "next"
      ];
        
      // add a switch to select an appropriate config for a current screen size
        
      function resetConfig(){
        let header;
        if (window.innerWidth < 1000) {
          header = compactHeader;
        } else {
          header = fullHeader;
      
        }
        scheduler.config.header = header;
        return true;
      }
        
      // apply the config initially and each time scheduler repaints or resizes:
        
      resetConfig();
      scheduler.attachEvent("onBeforeViewChange", resetConfig);
      scheduler.attachEvent("onSchedulerResize", resetConfig);
        
      scheduler.config.responsive_lightbox = true;
      scheduler.plugins({
          quick_info: true
      });

      this.initSchedulerEvents();

      const { events } = this.props;
      scheduler.init(this.schedulerContainer, new Date());
      scheduler.clearAll();
      scheduler.parse(events);
    }

    componentDidUpdate() {
      scheduler.render();
    }

    componentWillUnmount() {
      scheduler.detachEvent(this.addEvent);
      scheduler.detachEvent(this.changeEvent);
      scheduler.detachEvent(this.deleteEvent);
    }

    render() {
      return (
        <div
          ref={ (input) => { this.schedulerContainer = input } }
          style={ { width: '100%', height: '100%' } }
          className='scheduler-container'
        ></div>
      );
    }
}