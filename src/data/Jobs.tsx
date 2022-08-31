import Db from "./InitDb";

export const readSomeJobs = async (filter: string, sort: string, order: any) =>
    new Promise((resolve, reject): any => {


        console.log(filter + ' ' + sort + ' ' + order);
        const jobsRef = new Db().init().firestore().collection('jobs')
            .where('status', '==', filter)
            .orderBy(sort, order);
        jobsRef.onSnapshot((docSnapshot: { docs: any[]; }) => {
            const data = docSnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
                id: doc.id, ...doc.data(),
                company: doc, ...doc.data(),
                jobDescription: doc, ...doc.data(),
                created: doc, ...doc.data(),
                webAd: doc, ...doc.data(),
                webCompany: doc, ...doc.data(),
                kontaktPerson: doc, ...doc.data(),
                kontaktPhone: doc, ...doc.data(),
                kontaktEmail: doc, ...doc.data(),
                kontaktRating: doc, ...doc.data(),
                favorite: doc, ...doc.data(),
                status: doc, ...doc.data(),
            }));

            var arr: any = [];
            data.forEach(element => {
                arr.push(element);
            });
            resolve(arr);
        }, (err: any) => {
            console.log(`Encountered error: ${err}`);
            reject(`Encountered error: ${err}`);
        });
    })

export const readAllJobs = async (sort: string, order: any) =>
    new Promise((resolve, reject): any => {

        const jobsRef = new Db().init().firestore().collection('jobs')
            .orderBy(sort, order);
        jobsRef.onSnapshot((docSnapshot: { docs: any[]; }) => {
            const data = docSnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
                id: doc.id, ...doc.data(),
                company: doc, ...doc.data(),
                jobDescription: doc, ...doc.data(),
                created: doc, ...doc.data(),
                webAd: doc, ...doc.data(),
                webCompany: doc, ...doc.data(),
                kontaktPerson: doc, ...doc.data(),
                kontaktPhone: doc, ...doc.data(),
                kontaktEmail: doc, ...doc.data(),
                kontaktRating: doc, ...doc.data(),
                favorite: doc, ...doc.data(),
                status: doc, ...doc.data(),
            }));

            var arr: any = [];
            data.forEach(element => {
                arr.push(element);
            });
            resolve(arr);
        }, (err: any) => {
            console.log(`Encountered error: ${err}`);
            reject(`Encountered error: ${err}`);
        });
    })

export const saveJobData = (jobdata: any) => {

    new Db().init().firestore().collection('jobs').doc((jobdata.id) ? jobdata.id : (Math.random() * 100000000).toFixed(0)).set({
        company: jobdata.company,
        jobDescription: (jobdata.jobDescription !== 'undefined' && typeof jobdata.jobDescription === 'string') ? jobdata.jobDescription : '',
        city: (jobdata.city !== 'undefined' && typeof jobdata.city === 'string') ? jobdata.city : '',
        country: (jobdata.country !== 'undefined' && typeof jobdata.country === 'string') ? jobdata.country : '',
        created: (jobdata.created !== 'undefined') ? jobdata.created : '',
        kontaktPerson: (jobdata.kontaktPerson !== 'undefined') ? jobdata.kontaktPerson : '',
        kontaktPhone: (jobdata.kontaktPhone !== 'undefined') ? jobdata.kontaktPhone : '',
        kontaktEmail: (jobdata.kontaktEmail !== 'undefined') ? jobdata.kontaktEmail : '',
        // kontaktRating: (jobdata.kontaktRating !== 'undefined') ? jobdata.kontaktRating : '',
        webAd: (jobdata.webAd && jobdata.webAd !== 'undefined') ? jobdata.webAd : '---',
        webCompany: (jobdata.webCompany !== 'undefined') ? jobdata.webCompany : '',
        // favorite: (jobdata.favorite !== 'undefined') ? jobdata.favorite : '',
        status: (jobdata.status !== 'undefined') ? jobdata.status : '',
        // reported: (jobdata.reported === true || jobdata.reported === false) ? jobdata.reported : false,
        remarks: (jobdata.remarks) ? jobdata.remarks : "",
    })
        .then(function () { })
        .catch(function (error: any) {
            console.error("Error writing document: ", error);
        });
}

export const deleteJob = async (id: string) => {
    new Db().init().firestore().collection('jobs').doc(id.valueOf()).delete();
}
