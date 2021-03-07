export const List = ({ users, list }: any): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>major</th>
        </tr>
      </thead>
      <tbody>
        {list.map((l: any) => (
          <tr key={l.name}>
            <td>{l.name}</td>
            <td>{users.find((user: any) => user.id === l.personId)?.name || '1111'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
