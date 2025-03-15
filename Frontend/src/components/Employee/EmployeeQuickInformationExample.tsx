const EmployeeQuickInformationExample = () => {
  return (
    <div className="bg-white border p-4 mb-4 rounded-xl w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <p className="truncate">Prénom Nom</p>
        <p className="">téléphone fixe</p>
        <p className="">téléphone mobile</p>
        <p className="truncate">email</p>
      </div>
    </div>
  );
};

export default EmployeeQuickInformationExample;
