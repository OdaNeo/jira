export const SearchPanel = ({ users, param, setParam }: any): JSX.Element => {
  return (
    <form>
      <div>
        <input
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value
            })
          }
          type="text"
        />
        <select
          value={param.personId}
          onChange={e =>
            setParam({
              ...param,
              personId: e.target.value
            })
          }
        >
          <option value={''}>负责人</option>
          {users.map((user: any) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}
