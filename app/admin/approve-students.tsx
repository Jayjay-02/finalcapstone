import AsyncStorage from '@react-native-async-storage/async-storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

interface Student {
  name: string;
  email: string;
  password: string;
  profilePic?: string;
  groupId?: number;
  notifications?: { message: string; type: "info" | "success" }[];
}

interface DefenseSchedule {
  email: string;
  date: string;
  time: string;
}

export default function ApproveStudents() {
  const [pending, setPending] = useState<Student[]>([]);
  const [approved, setApproved] = useState<Student[]>([]);
  const [schedules, setSchedules] = useState<DefenseSchedule[]>([]);

  // Load data from AsyncStorage
  useEffect(() => {
    (async () => {
      const storedPending = JSON.parse(await AsyncStorage.getItem('pendingStudents') || '[]');
      const storedApproved = JSON.parse(await AsyncStorage.getItem('approvedStudents') || '[]');
      const storedSchedules = JSON.parse(await AsyncStorage.getItem('defenseSchedules') || '[]');

      setPending(storedPending);
      setApproved(storedApproved);
      setSchedules(storedSchedules);
    })();
  }, []);

  const approveStudent = async (email: string) => {
    const student = pending.find(s => s.email === email);
    if (!student) return;

    const updatedPending = pending.filter(s => s.email !== email);
    const updatedApproved = [...approved, student];

    await AsyncStorage.setItem('pendingStudents', JSON.stringify(updatedPending));
    await AsyncStorage.setItem('approvedStudents', JSON.stringify(updatedApproved));

    setPending(updatedPending);
    setApproved(updatedApproved);
  };

  const rejectStudent = async (email: string) => {
    const updatedPending = pending.filter(s => s.email !== email);
    await AsyncStorage.setItem('pendingStudents', JSON.stringify(updatedPending));
    setPending(updatedPending);
  };

  const scheduleDefense = async (email: string) => {
    const date = prompt('Enter defense date (YYYY-MM-DD):');
    const time = prompt('Enter defense time (e.g., 2:00 PM):');
    if (!date || !time) return;

    // Update defenseSchedules
    const updatedSchedules = [...schedules.filter(s => s.email !== email), { email, date, time }];
    setSchedules(updatedSchedules);
    await AsyncStorage.setItem('defenseSchedules', JSON.stringify(updatedSchedules));

    // Push notification to approvedStudents
    const allApproved: Student[] = JSON.parse(await AsyncStorage.getItem('approvedStudents') || '[]');
    const updatedApprovedStudents = allApproved.map((s) => {
      if (s.email === email) {
        const notifs = s.notifications || [];
        notifs.push({
          message: `📅 Your defense is scheduled on ${date} at ${time}`,
          type: "info",
        });
        return { ...s, notifications: notifs };
      }
      return s;
    });

    await AsyncStorage.setItem('approvedStudents', JSON.stringify(updatedApprovedStudents));
    setApproved(updatedApprovedStudents);

    alert(`✅ Defense scheduled for ${email} on ${date} at ${time}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Approve Registered Students</h2>

      {/* Pending Students */}
      {pending.length === 0 ? (
        <div className="alert alert-info">No pending students for approval.</div>
      ) : (
        <table className="table table-bordered">
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th style={{ width: '200px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map(student => (
              <tr key={student.email}>
                <td>
                  {student.profilePic ? (
                    <img
                      src={student.profilePic}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px", objectFit: "cover" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => approveStudent(student.email)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => rejectStudent(student.email)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr className="my-4" />

      {/* Approved Students */}
      <h4 className="fw-semibold">Approved Students</h4>
      {approved.length === 0 ? (
        <div className="alert alert-secondary">No students have been approved yet.</div>
      ) : (
        <table className="table table-bordered">
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Defense Schedule</th>
              <th style={{ width: '200px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {approved.map(student => {
              const sched = schedules.find(s => s.email === student.email);
              return (
                <tr key={student.email}>
                  <td>
                    {student.profilePic ? (
                      <img
                        src={student.profilePic}
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px", objectFit: "cover" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    {sched ? `${sched.date} at ${sched.time}` : 'Not scheduled'}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => scheduleDefense(student.email)}
                    >
                      {sched ? 'Reschedule' : 'Schedule Defense'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
